from fastapi import APIRouter, Depends, Request
from app.validation_schema.user_validation_schema import PaymentSchema
from app.auth.jwt_handler import get_current_user
from app.services.stripe_service import create_checkout_session
import stripe
from app.configs.settings import settings
from app.db.mongo import db
from app.utils.send_email import send_email
from datetime import datetime
from app.utils.error_handler import api_error

router = APIRouter()


@router.post("/subcribe")
async def subcribe(
    body: PaymentSchema,
    user=Depends(get_current_user)
):
    url = create_checkout_session(body.email, body.price_id)
    return {
        "checkout_url": url
    }

@router.post('/webhook')
async def stripe_webhook(req: Request):
    payload = await req.body()
    sig_header = req.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.stripe_webhook_secret
        )

        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            customer_email = session.get("customer_email")
            subscription_id = session.get("subscription")

            subscription = stripe.Subscription.retrieve(subscription_id, expand=['plan.product'])
            plan_price = subscription['items']['data'][0]['plan']['amount'] / 100 
            next_billing_date = datetime.fromtimestamp(subscription['items']['data'][0]['current_period_end']).strftime('%Y-%m-%d %H:%M:%S')
            invoice_id = subscription['latest_invoice']
            invoice = stripe.Invoice.retrieve(invoice_id)
            invoice_url = invoice.get('hosted_invoice_url')

            plan_name = subscription['plan']['product']['name']
            if plan_name.lower() == "basic plan":
                max_job_post = 5
            elif plan_name.lower() == "business":
                max_job_post = 15
            elif plan_name.lower() == "enterprise":
                max_job_post = 50 
            else:
                max_job_post = 0  

            db.users.update_one({
                "email": customer_email,
            }, {
                "$set": {
                    "feature": {
                        "max_job_post": max_job_post,
                        "used_job": 0,
                        "current_plan_name": plan_name,
                        "price": f"{subscription['items']['data'][0]['plan']['amount'] / 100 } BDT",
                        "subscription_id": subscription_id,
                        "next_billing_date": next_billing_date,
                        "is_active": True,
                    }
                }
            })
            

            user = db.users.find_one({"email": customer_email})
            if user:
                await send_email(
                    email=customer_email,
                    full_name=user['first_name'],
                    temp_id=4,
                    params={
                        "name": user['first_name'],
                        "plan_name": subscription['plan']['product']['name'],
                        "plan_price": plan_price,
                        "start_date": datetime.fromtimestamp(subscription['start_date']).strftime('%Y-%m-%d %H:%M:%S'),
                        "next_billing_date": next_billing_date,
                        "invoice": invoice_url,
                        "dashboard_link": f"{settings.client_url}/employer"
                    }
                    
                )

            return {"status": "success"}
        return {"status": "ignored"}
    except stripe.error.SignatureVerificationError:
        api_error(400, "Invalid signature")


@router.get("/details")
def get_payment_details(user=Depends(get_current_user)):
    subscription_id = user['feature']['subscription_id']
    if not subscription_id:
        return {"message": "No active subscription"}

    subscription = stripe.Subscription.retrieve(subscription_id, expand=['plan.product'])
    invoice = stripe.Invoice.retrieve(subscription.latest_invoice)


    return {
        "transaction_id": invoice.id,
        "amount": f"{invoice.amount_paid / 100} BDT", 
        "plan_name": subscription['plan']['product']['name'],
        "invoice_pdf_url": invoice.invoice_pdf
    }