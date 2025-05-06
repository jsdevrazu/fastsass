from pymongo import MongoClient, errors
from app.configs.settings import settings

try:
    client = MongoClient(settings.mongo_uri, serverSelectionTimeoutMS=5000)
    client.server_info() 
    db = client[settings.db_name]
    indexes = db.otps.index_information()
    if "created_at_1" in indexes:
        db.otps.drop_index("created_at_1")

    db.otps.create_index(
        [("created_at", 1)], expireAfterSeconds=900
    )
    
    print("✅ DB Connected & TTL index created successfully")


except errors.ServerSelectionTimeoutError:
    print("❌ MongoDB server not available. Check your connection or MongoDB URL.")
    db = None

except errors.ConnectionFailure as e:
    print(f"❌ Could not connect to MongoDB: {e}")
    db = None