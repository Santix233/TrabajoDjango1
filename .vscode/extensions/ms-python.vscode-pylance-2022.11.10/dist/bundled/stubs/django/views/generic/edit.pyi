import sys
from typing import Any, Dict, Generic, Optional, Type, TypeVar, Union

from django.db import models
from django.forms.forms import BaseForm
from django.forms.models import BaseModelForm
from django.http import HttpRequest, HttpResponse
from django.utils.datastructures import _ListOrTuple
from django.views.generic.base import ContextMixin, TemplateResponseMixin, View
from django.views.generic.detail import BaseDetailView, SingleObjectMixin, SingleObjectTemplateResponseMixin

if sys.version_info < (3, 8):
    from typing_extensions import Literal
else:
    from typing import Literal

_FormT = TypeVar("_FormT", bound=BaseForm)
_ModelFormT = TypeVar("_ModelFormT", bound=BaseModelForm)
_M = TypeVar("_M", bound=models.Model)

class FormMixin(Generic[_FormT], ContextMixin):
    initial: Dict[str, Any] = ...
    form_class: Optional[Type[_FormT]] = ...
    success_url: Optional[str] = ...
    prefix: Optional[str] = ...
    def get_initial(self) -> Dict[str, Any]: ...
    def get_prefix(self) -> Optional[str]: ...
    def get_form_class(self) -> Type[_FormT]: ...
    def get_form(self, form_class: Optional[Type[_FormT]] = ...) -> BaseForm: ...
    def get_form_kwargs(self) -> Dict[str, Any]: ...
    def get_success_url(self) -> str: ...
    def form_valid(self, form: _FormT) -> HttpResponse: ...
    def form_invalid(self, form: _FormT) -> HttpResponse: ...
    def get_context_data(self, **kwargs: Any) -> Dict[str, Any]: ...

class ModelFormMixin(Generic[_M, _ModelFormT], FormMixin[_ModelFormT], SingleObjectMixin[_M]):
    fields: Optional[Union[_ListOrTuple[str], Literal["__all__"]]] = ...
    def get_form_class(self) -> Type[_ModelFormT]: ...
    def get_form_kwargs(self) -> Dict[str, Any]: ...
    def get_success_url(self) -> str: ...
    def form_valid(self, form: _ModelFormT) -> HttpResponse: ...

class ProcessFormView(View):
    def get(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse: ...
    def post(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse: ...
    def put(self, *args: Any, **kwargs: Any) -> HttpResponse: ...

class BaseFormView(FormMixin[_FormT], ProcessFormView): ...
class FormView(TemplateResponseMixin, BaseFormView[_FormT]): ...

class BaseCreateView(ModelFormMixin[_M, _ModelFormT], ProcessFormView):
    object: None
    def get(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse: ...
    def post(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse: ...

class CreateView(SingleObjectTemplateResponseMixin, BaseCreateView[_M, _ModelFormT]):
    template_name_suffix: str = ...

class BaseUpdateView(ModelFormMixin[_M, _ModelFormT], ProcessFormView):
    object: _M
    def get(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse: ...
    def post(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse: ...

class UpdateView(SingleObjectTemplateResponseMixin, BaseUpdateView[_M, _ModelFormT]):
    template_name_suffix: str = ...

class DeletionMixin(Generic[_M]):
    success_url: Optional[str] = ...
    object: _M
    def post(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse: ...
    def delete(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse: ...
    def get_success_url(self) -> str: ...

class BaseDeleteView(DeletionMixin[_M], BaseDetailView[_M]):
    object: _M

class DeleteView(SingleObjectTemplateResponseMixin, BaseDeleteView[_M]):
    object: _M
    template_name_suffix: str = ...
