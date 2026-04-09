const keywordMap = {
  JavaScript: ["async", "await", "promise", "fetch", "dom", "event", "callback", "closure", "prototype", "class", "arrow-function", "destructuring", "spread", "rest", "template-literal", "module", "import", "export", "json", "array", "object", "map", "filter", "reduce", "foreach", "settimeout", "setinterval", "try-catch", "error-handling"],
  TypeScript: ["interface", "type", "generic", "enum", "decorator", "readonly", "union", "intersection", "utility-type", "mapped-type", "conditional-type", "assertion", "guard", "namespace", "module", "async", "await", "promise"],
  Python: ["def", "class", "lambda", "list-comprehension", "generator", "decorator", "context-manager", "async", "await", "exception", "dictionary", "tuple", "set", "slice", "f-string", "import", "module", "pip", "virtualenv", "pandas", "numpy"],
  Java: ["class", "interface", "abstract", "extends", "implements", "static", "final", "synchronized", "thread", "stream", "lambda", "generic", "annotation", "exception", "collection", "arraylist", "hashmap", "spring", "maven"],
  C: ["pointer", "struct", "malloc", "free", "array", "string", "header", "macro", "typedef", "enum", "union", "static", "extern", "volatile", "const", "sizeof", "printf", "scanf", "file-io"],
  "C++": ["class", "template", "stl", "vector", "map", "iterator", "smart-pointer", "virtual", "override", "namespace", "operator-overloading", "constructor", "destructor", "inheritance", "polymorphism", "lambda", "auto", "constexpr"],
  SQL: ["select", "insert", "update", "delete", "join", "inner-join", "left-join", "right-join", "group-by", "order-by", "having", "where", "subquery", "index", "view", "stored-procedure", "trigger", "transaction", "aggregate", "union"],
  Go: ["goroutine", "channel", "interface", "struct", "slice", "map", "defer", "panic", "recover", "package", "import", "concurrency", "mutex", "waitgroup", "context", "error-handling"],
  Rust: ["ownership", "borrowing", "lifetime", "trait", "enum", "match", "option", "result", "struct", "impl", "generic", "closure", "iterator", "async", "unsafe", "macro", "crate", "module"],
};

export function generateTags(code, language) {
  const lowerCode = code.toLowerCase();
  const langKeywords = keywordMap[language] || [];
  const tags = [language.toLowerCase()];

  for (const keyword of langKeywords) {
    const searchTerms = keyword.split("-");
    if (searchTerms.some((term) => lowerCode.includes(term))) {
      if (!tags.includes(keyword)) {
        tags.push(keyword);
      }
    }
  }

  return tags.slice(0, 8);
}
