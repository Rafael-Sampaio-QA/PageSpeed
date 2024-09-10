describe('Acessar PageSpeed e garantir as métricas de performance via web', () => {
    const baseUrl = 'https://pagespeed.web.dev/';
    const urls = [
        'https://eb81b0f1-fb07-446f-a9bc-7f135fdaeba7.preview.atdplatform.work/',
        'https://79da3661-f3a5-4867-a927-d2d63d75970d.preview.atdplatform.work/',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
    
    ];
    const valores = {
        min : 30, 
        max : 100
      }
    const elementos = {
        inserirUrls: 'input[type="text"]',
        btnAbalisar: 'button:contains("Analyze")',
        btnDesktop: '[id="desktop_tab"]',
        desempenho: '[href="#performance"] .lh-gauge__percentage',
        acessibilidade: '[href="#accessibility"] .lh-gauge__percentage',
        praticasRecomendadas: '[href="#best-practices"] .lh-gauge__percentage',
        seo: '[href="#seo"] .lh-gauge__percentage'
    };

    const validarMetricasMobile = (elements, seletorNome) => {
        cy.get(elements).eq(1)
            .invoke('text')
            .then((text) => {
             
                const value = parseInt(text, 10);
                expect(value).to.be.within(valores.min, valores.max, `${seletorNome}`);

            });
    };

    const validarMetricasDesktop = (elements, seletorNome) => {
        cy.get(elements).eq(2)
            .invoke('text')
            .then((text) => {
             
                const value = parseInt(text, 10);
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

            validarMetricasMobile(elementos.desempenho, 'Desempenho');
            validarMetricasMobile(elementos.acessibilidade, 'Acessibilidade');
            validarMetricasMobile(elementos.praticasRecomendadas, 'Práticas Recomendadas');
            validarMetricasMobile(elementos.seo, 'SEO');


            cy.get(elementos.btnDesktop)
            .as('btnDesktop')
            .should('be.visible')
            .click();
            
            validarMetricasDesktop(elementos.desempenho, 'Desempenho');
            validarMetricasDesktop(elementos.acessibilidade, 'Acessibilidade');
            validarMetricasDesktop(elementos.praticasRecomendadas, 'Práticas Recomendadas');
            validarMetricasDesktop(elementos.seo, 'SEO');
            
        });
    });
});
