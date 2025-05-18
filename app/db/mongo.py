from pymongo import MongoClient, errors
from app.configs.settings import settings
import certifi
from app.dump.faker import generate_fake_job
from app.constant.index import MAX_JOB_GENERATE

try:
    client = MongoClient(settings.mongo_uri, serverSelectionTimeoutMS=5000, tlsCAFile=certifi.where())
    client.server_info() 
    db = client[settings.db_name]
    indexes = db.otps.index_information()
    fake_jobs = [generate_fake_job() for _ in range(MAX_JOB_GENERATE)]
    if "created_at_1" in indexes:
        db.otps.drop_index("created_at_1")

    db.otps.create_index(
        [("created_at", 1)], expireAfterSeconds=900
    )

    # db.jobs.insert_many(fake_jobs)
    # print(f"{MAX_JOB_GENERATE} fake job entries inserted.")
    
    print("✅ DB Connected & TTL index created successfully")


except errors.ServerSelectionTimeoutError as error:
    print("App error", error)
    print("❌ MongoDB server not available. Check your connection or MongoDB URL.")
    db = None

except errors.ConnectionFailure as e:
    print(f"❌ Could not connect to MongoDB: {e}")
    db = None