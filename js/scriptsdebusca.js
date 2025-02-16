// Função para remover acentos e caracteres especiais
function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z\s]/g, "");
}

// Criando um conjunto para armazenar palavras únicas
const palavrasUnicas = new Set();
const linhas = [
    "camisinha social manguinha longuinha azul clarinha",
    "calçinha jeans azul escurinha",
    "sainha jeans azul clarinha",
    "bermudinha de sarjinha bege escurinha",
    "blusinha de manguinha curtinha pretinha",
    "camisinha social manguinha curtinha branquinha",
    "calçinha jeans pretinha",
    "sainha midizinha bege clarinha",
    "bermudinha jeans azul clarinha",
    "blusinha manguinha longuinha branquinha",
    "camisinha casual manguinha longuinha pretinha",
    "calçinha jeans azul clarinha",
    "sainha curtinha jeans azul escurinha",
    "bermudinha de sarjinha pretinha",
    "blusinha manguinha curtinha bege clarinha"
];

// Criando vetores documento_#
const documentos = {};
linhas.forEach((linha, index) => {
    const palavras = linha.split(" ");
    palavras.forEach(palavra => palavrasUnicas.add(palavra));
    documentos[`documento_${index + 1}`] = palavras;
});

// Convertendo o conjunto em um vetor
const vetorPalavrasUnicas = Array.from(palavrasUnicas);

// Função para processar o texto digitado pelo usuário
function processarBusca() {
    // const texto = document.getElementById("campoBusca").value;
    // const textoNormalizado = normalizarTexto(texto);
    // const busca_0 = textoNormalizado.split(" ").filter(palavra => palavra !== "");
    const busca_0 = ["calca", "camiseta", "preta"];
    
    // Filtrar palavras que não estão no vetor de palavras únicas
    const busca_1 = [...new Set(busca_0.filter(palavra => vetorPalavrasUnicas.includes(palavra)))];

    // Criando vetores de contagem para cada documento
    const vetoresBusca = {};
    Object.keys(documentos).forEach(key => {
        vetoresBusca[key] = busca_1.map(palavra => documentos[key].filter(p => p === palavra).length);
    });

    // Criando o vetor busca_0_busca
    const busca_0_busca = busca_1.map(palavra => busca_0.filter(p => p === palavra).length);

    // Função para transformar vetor em versor (unitário)
    function normalizarVetor(vetor) {
        const norma = Math.sqrt(vetor.reduce((sum, val) => sum + val * val, 0));
        return norma === 0 ? vetor : vetor.map(val => val / norma);
    }

    // Normalizar os vetores
    Object.keys(vetoresBusca).forEach(key => {
        vetoresBusca[key] = normalizarVetor(vetoresBusca[key]);
    });
    const busca_0_versor = normalizarVetor(busca_0_busca);

    // Função para calcular o cosseno entre dois vetores
    function calcularCosseno(v1, v2) {
        const produtoEscalar = v1.reduce((sum, val, i) => sum + val * v2[i], 0);
        return produtoEscalar;
    }

    // Calcular os cossenos e ordenar os documentos
    const cossenos = Object.keys(vetoresBusca).map(key => ({
        documento: key,
        cosseno: calcularCosseno(vetoresBusca[key], busca_0_versor)
    })).sort((a, b) => b.cosseno - a.cosseno);

    console.log("Vetor de palavras únicas:", vetorPalavrasUnicas);
    console.log("Busca 0:", busca_0);
    console.log("Busca 1:", busca_1);
    console.log("Busca 0 - Busca:", busca_0_busca);
    console.log("Vetores de documentos normalizados:", vetoresBusca);
    console.log("Cossenos ordenados:", cossenos);
}

// Adicione um evento para chamar processarBusca ao clicar no botão
document.getElementById("botaoBuscar").addEventListener("click", processarBusca);