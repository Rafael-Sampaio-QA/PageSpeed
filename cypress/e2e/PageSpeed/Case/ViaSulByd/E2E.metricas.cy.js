describe('Acessar PageSpeed e garantir as métricas de performance via web', () => {
    const baseUrl = 'https://pagespeed.web.dev/';
    const urls = [
        'https://www.viasulbyd.com.br/',
        'https://www.viasulbyd.com.br/dolphin/',
        'https://www.viasulbyd.com.br/seal/',
        'https://www.viasulbyd.com.br/han/',
        'https://www.viasulbyd.com.br/tan/',
        'https://www.viasulbyd.com.br/dolphin-mini/',
        'https://www.viasulbyd.com.br/song-plus/',
        'https://www.viasulbyd.com.br/dolphin-plus/',
        'https://www.viasulbyd.com.br/byd-king/',
        'https://www.viasulbyd.com.br/quem-somos/',
        'https://www.viasulbyd.com.br/fale-conosco/',
        'https://www.viasulbyd.com.br/politica-de-privacidade/',
        'https://www.viasulbyd.com.br/ofertas/',
        'https://www.viasulbyd.com.br/test-drive/'
    ];
    const valores = {
        min : 30, 
        max : 100
      }
    const elementos = {
        inserirUrls: 'input[type="text"]',
        btnAbalisar: 'button:contains("Analyze")',
        desempenho: '[href="#performance"] .lh-gauge__percentage',
        acessibilidade: '[href="#accessibility"] .lh-gauge__percentage',
        praticasRecomendadas: '[href="#best-practices"] .lh-gauge__percentage',
        seo: '[href="#seo"] .lh-gauge__percentage'
    };

    const validarMetricas = (elements, seletorNome) => {
        cy.get(elements)
            .invoke('text')
            .then((text) => {
                const match = text.match(/(\d{1,3})/);
                const value = parseInt(match[0], 10);
                expect(value).to.be.within(valores.min, valores.max, `${seletorNome}`);

            });
    };

    beforeEach(() => {
        cy.visit(baseUrl);
        cy.viewport(1480, 1020);
    });

    urls.forEach((url) => {
        it(`Deve verificar métricas de desempenho`, () => {
            cy.get(elementos.inserirUrls)
                .should('be.visible')
                .clear()
                .type(url)
                .should('have.value', url);

            cy.get(elementos.btnAbalisar).should('be.visible').click();
            cy.get(elementos.desempenho, { timeout: 120000 }).should('be.visible');

            validarMetricas(elementos.desempenho, 'Desempenho');
            validarMetricas(elementos.acessibilidade, 'Acessibilidade');
            validarMetricas(elementos.praticasRecomendadas, 'Práticas Recomendadas');
            validarMetricas(elementos.seo, 'SEO');
        });
    });
});
