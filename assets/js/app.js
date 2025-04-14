
    document.getElementById('solarForm').addEventListener('submit', function(e){

        e.preventDefault();

        // Captura dos valores
        const tipoRede = document.querySelector("#tipoRede").value;
        const consumoMensal = parseInt(document.querySelector("#consumoMensal").value);
        const irradiancia = parseFloat(document.querySelector("#irradiancia").value);
        const rendimento = parseFloat(document.querySelector("#rendimento").value);
        const potenciaPainel = parseInt(document.querySelector("#potenciaPainel").value);
        const vocPainel = parseFloat(document.querySelector("#vocPainel").value);
        const vmppPainel = parseFloat(document.querySelector("#vmppPainel").value);
        const mpptMin = parseInt(document.querySelector("#mpptMin").value);
        const mpptMax = parseInt(document.querySelector("#mpptMax").value);
        const resultado = document.querySelector('#resultado')

        // Ajuste tipo de rede
        let ajuste = 0;
        if (tipoRede === 'monofasico') ajuste = 30;
        else if (tipoRede === 'bifasico') ajuste = 50;
        else if (tipoRede === 'trifasico') ajuste = 100;

        // Cálculos
        const consumoDiario = (consumoMensal - ajuste) / 30;
        let potenciaSistema = consumoDiario / (irradiancia * rendimento);
        potenciaSistema = parseFloat(potenciaSistema.toFixed(1));

        let numeroPaineis = (potenciaSistema * 1000) / potenciaPainel;
        numeroPaineis = Math.round(numeroPaineis);

        const potenciaMinInversor = parseFloat((potenciaSistema * 0.9).toFixed(1));
        const potenciaMaxInversor = parseFloat((potenciaSistema * 1.1).toFixed(1));

        // Paineis por string
        const maxPaineisStrings = Math.floor(mpptMax / vocPainel);
        const stringRecomendada = Math.ceil(maxPaineisStrings * 0.8);

        // Exibir resultados no HTML
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `
        <div class="mt-4 p-4 bg-light rounded shadow-sm">
          <h5 class="text-warning mb-3">Resultado do Dimensionamento</h5>
      
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <strong>Consumo diário:</strong> <span id="consumoDiario">${consumoDiario.toFixed(1)}</span> kWh
            </li>
            <li class="list-group-item">
              <strong>Sistema necessário:</strong> <span id="sistemaNecessario">${potenciaSistema}</span> kWp
            </li>
            <li class="list-group-item">
              <strong>Quantidade de painéis:</strong> <span id="quantidadePaineis">${numeroPaineis}</span> unidades
            </li>
            <li class="list-group-item">
              <strong>Inversor ideal:</strong> entre <span id="inversorMin">${potenciaMinInversor}</span> kW e <span id="inversorMax">${potenciaMaxInversor}</span> kW
            </li>
            <li class="list-group-item">
              <strong>Painéis por string (máx):</strong> <span id="stringMax">${maxPaineisStrings}</span>
            </li>
          </ul>
        </div>
      </div>
        `; 
        
        resultado.classList.remove('hidden')

        setTimeout(() => {
            resultadoDiv.scrollIntoView({ behavior: 'smooth' });
          }, 100)
    })