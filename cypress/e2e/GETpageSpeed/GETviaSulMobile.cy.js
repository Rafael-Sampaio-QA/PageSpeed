describe('Validação de Métricas do PageSpeed Insights (Mobile)', () => {
    
    
    const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
    const apiKey = 'AIzaSyDNjrUq_FHXDnLjz7EylktUp790F9AfreE';
    const urls = [
          'https://www.viasulbyd.com.br/',
          /* 'https://www.viasulbyd.com.br/dolphin/',
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
          'https://www.viasulbyd.com.br/test-drive/' */,
     
    ];

    urls.forEach((testUrl) => {
        it(`Deve validar as metricas (mobile) para a URL: ${testUrl}`, () => {

              const apiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(testUrl)}&key=${apiKey}&strategy=mobile&locale=pt-BR&category=${categories.join('&category=')}`;
           // const apiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(testUrl)}&key=${apiKey}&strategy=mobile&category=${categories.join('&category=')}`;

            cy.api(apiEndpoint).then((response) => {

                expect(response.status).to.eq(200);

                var lighthouseResult = response.body.lighthouseResult

                const Trends = {

                    metricasDesempenho: {
                        
                        desempenho: lighthouseResult.categories.performance.score || 0,
                        acessibilidade: lighthouseResult.categories.accessibility.score || 0,
                        melhoresPraticas: lighthouseResult.categories['best-practices'].score || 0,
                        seo: lighthouseResult.categories.seo.score || 0,

                    },

                    metricasCoreWeb: {
                        CLS: response.body.originLoadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile,
                        TTFB: response.body.originLoadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.percentile,
                        FCP: response.body.originLoadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile,
                        INP: response.body.originLoadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.percentile,
                        LCP: response.body.originLoadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile,
                    }
                };

                cy.log(`URL: ${testUrl}`);
                console.log(response)
                cy.log(`Pontuação de Desempenho (Mobile): ${Trends.metricasDesempenho.desempenho * 100}`);
                cy.log(`Pontuação de Acessibilidade: ${Trends.metricasDesempenho.acessibilidade * 100}`);
                cy.log(`Pontuação de Praticas Recomendadas: ${Trends.metricasDesempenho.melhoresPraticas * 100}`);
                cy.log(`Pontuação de SEO: ${Trends.metricasDesempenho.seo * 100}`);
                cy.log(`First Contentful Paint (FCP): ${Trends.metricasCoreWeb.Fcp}`);
                cy.log(`Largest Contentful Paint (LCP): ${Trends.metricasCoreWeb.Lcp}`);
                cy.log(`Cumulative Layout Shift (CLS): ${Trends.metricasCoreWeb.Cls}`);

                expect(Trends.metricasDesempenho.desempenho).to.be.a('number').to.be.gte(0.7);
                expect(Trends.metricasDesempenho.acessibilidade).to.be.a('number').and.to.be.gte(0.8);
                expect(Trends.metricasDesempenho.melhoresPraticas).to.be.a('number').and.to.be.gte(0.8);
                expect(Trends.metricasDesempenho.seo).to.be.a('number').and.to.be.gte(0.1);


                expect(parseFloat(Trends.metricasCoreWeb.CLS)).to.be.lte(0.1); // CLS Percentile deve ser menor ou igual a 0.1
                expect(parseFloat(Trends.metricasCoreWeb.TTFB)).to.be.lte(900); // TTFB Percentile deve ser menor ou igual a 800ms
                expect(parseFloat(Trends.metricasCoreWeb.FCP)).to.be.lte(1800); // FCP Percentile deve ser menor ou igual a 1.8s
                expect(parseFloat(Trends.metricasCoreWeb.INP)).to.be.lte(2500); // INP Percentile deve ser menor ou igual a 200ms
                expect(parseFloat(Trends.metricasCoreWeb.LCP)).to.be.lte(2500); // LCP Percentile deve ser menor ou igual a 2.5s
            });
        });
    });
});