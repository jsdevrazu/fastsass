import socketio
import jwt
from app.configs.settings import settings

sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*',
    logger=True,
    engineio_logger=True
)

socket_app = socketio.ASGIApp(sio)

@sio.event
async def connect(sid, environ, auth):
    token = None
    cookies = environ.get("HTTP_COOKIE", "")
    
    from http.cookies import SimpleCookie
    parsed_cookies = SimpleCookie(cookies)
    if "accessToken" in parsed_cookies:
        token = parsed_cookies["accessToken"].value

    if not token and auth:
        token = auth.get("token")

    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        user_id = payload.get("_id")
        if not user_id:
            raise ValueError("Invalid token")

        print(f"✅ Authenticated socket: {user_id}")

        await sio.enter_room(sid, user_id)
        await sio.save_session(sid, {"user_id": user_id})
        await sio.emit("SOCKET_CONNECTED", "Authenticated Socket Connected", to=sid)

    except (jwt.PyJWTError, Exception) as e:
        print("❌ Token error:", str(e))
        await sio.emit("SOCKET_CONNECTED", "Unauthenticated Socket Connected", to=sid)

@sio.event
async def disconnect(sid):
    session = await sio.get_session(sid)
    user_id = session.get("user_id", "unknown")
    print(f"🔌 Disconnected: {user_id}")

async def emit_event(room: str, event: str, payload: dict):
    print(f"📤 Emitting to room: {room}, event: {event}, payload: {payload}")
    await sio.emit(event, payload, to=room)


