from typing import Callable, Any
from firebase_functions import https_fn
from firebase_functions.https_fn import FunctionsErrorCode, HttpsError


class CallableRequest(https_fn.CallableRequest):
    auth: https_fn.AuthData
    """
    This used to be optional in https_fn.CallableRequest,
    but with the decorator `require_authentication`, it must be present.
    """


def require_authentication(
    func: Callable[[CallableRequest], Any]
) -> Callable[[https_fn.CallableRequest], Any]:
    def wrapper(req: https_fn.CallableRequest) -> Any:
        if not req.auth:
            raise HttpsError(
                FunctionsErrorCode.UNAUTHENTICATED,
                FunctionsErrorCode.UNAUTHENTICATED.value,
            )
        return func(req)  # type: ignore

    return wrapper
