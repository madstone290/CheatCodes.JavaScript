function addDynamicImportMap() {
    function createImportMap(version = "1.0.0") {
        const paths = [
            "src/main",
            "src/util",
            "src/components/c1",
            "src/components/c2"
        ];
        const imports = {};
        paths.reduce((acc, path) => {
            acc[path] = `./${path}.js?v=${version}`;
            return acc;
        }, imports);
        return { imports };
    }
    const importMap = createImportMap("2.3.6");
    const importMapScript = document.createElement("script");
    importMapScript.type = "importmap";
    importMapScript.textContent = JSON.stringify(importMap);
    document.head.appendChild(importMapScript);
}