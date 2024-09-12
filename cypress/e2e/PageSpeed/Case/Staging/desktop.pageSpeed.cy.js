/// <reference types="cypress" />

const urls = {
    pageSpeed: 'https://pagespeed.web.dev/',
  
  };
  
  const valores = {
    min : 65, 
    max : 100
  }
  
  const elements = {
    inserirUrls : 'input[type="text"]',
    btnAbalisar: 'button:contains("Analyze")',
    btnDesktop: '[id="desktop_tab"]',
    Metricas: {
      desempenho: '[href="#performance"] .lh-gauge__percentage',
      acessibilidade: '[href="#accessibility"] .lh-gauge__percentage',
      praticasRecomendadas: '[href="#best-practices"] .lh-gauge__percentage',
      seo: '[href="#seo"] .lh-gauge__percentage'
    }
  };
  
  function validarElemento(selector) {
    cy.get(selector, { timeout: 120000 })
      .eq(2)
      .invoke('text')
      .then(text => {
        const value = parseInt(text, 10);
        expect(value , `Métrica =  ${selector}`).to.be.within(valores.min , valores.max);
      });
  }
  describe('Acessar PageSpeed e garantir as metricas de performance via web', () => {
    beforeEach(() => {
      cy.visit(urls.pageSpeed);
      cy.viewport(1480, 1020);
    });
  
    it('DESKTOP - PERFORMANCE - V1', () => {
      cy.get(elements.inserirUrls)
        .as('urlPageSpeed')
        .should('be.visible')
        .type(urls.insiraURL);
  
      cy.get('@urlPageSpeed').then($inputUrl => {
        const valorInputUrl = $inputUrl.val();
        expect(valorInputUrl).to.equal(urls.insiraURL);
      });
  
      cy.get(elements.btnAbalisar)
        .as('btnAnalisar')
        .should('be.visible')
        .click();

        cy.get(elements.btnDesktop)
        .as('btnDesktop')
        .should('be.visible')
        .click();

      Object.values(elements.Metricas).forEach(selector => {
        validarElemento(selector);
      });
    });
  });