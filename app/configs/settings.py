from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongo_uri: str
    db_name: str
    secret_key: str
    algorithm:str
    api_key: str
    google_client_id: str
    google_client_secret: str
    stripe_secret_key: str
    stripe_webhook_secret: str
    stripe_success_url: str
    stripe_cancel_url: str

    class Config:
        env_file = '.env'

settings = Settings()