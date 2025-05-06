import sib_api_v3_sdk
from app.configs.settings import settings

configuration = sib_api_v3_sdk.Configuration()
configuration.api_key['api-key'] = settings.api_key
api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))

def send_email(full_name: str, email: str, temp_id: int, params: dict):
        
    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
            to=[{"email": email, "name": full_name }],
            template_id=temp_id,
            params=params,
            headers={"X-Mailin-custom": "custom_header"},
    )

    api_instance.send_transac_email(send_smtp_email)



        