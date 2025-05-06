import stripe
from app.configs.settings import settings


stripe.api_key = settings.stripe_secret_key

def create_checkout_session(user_email: str, price_id: str):
    session = stripe.checkout.Session.create(
        success_url=settings.stripe_success_url + "?session_id={CHECKOUT_SESSION_ID}",
        cancel_url=settings.stripe_cancel_url,
        payment_method_types=["card"],
        mode="subscription",
        customer_email=user_email,
        line_items=[{"price": price_id, "quantity": 1}],
    )
    return session.url