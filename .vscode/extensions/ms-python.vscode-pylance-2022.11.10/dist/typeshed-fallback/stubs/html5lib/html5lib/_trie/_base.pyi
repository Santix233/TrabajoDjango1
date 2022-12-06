from abc import ABCMeta
from collections.abc import Mapping
from typing import Any

class Trie(Mapping[Any, Any], metaclass=ABCMeta):
    def keys(self, prefix: Any | None = ...): ...
    def has_keys_with_prefix(self, prefix): ...
    def longest_prefix(self, prefix): ...
    def longest_prefix_item(self, prefix): ...
