from typing import Any
from firebase_functions import https_fn
from middlewares.authentication import require_authentication, CallableRequest


@https_fn.on_call()
@require_authentication
def entry_document(req: CallableRequest) -> Any:
    return req.auth.token["email"]
