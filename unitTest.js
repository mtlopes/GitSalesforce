const { chromium } = require('playwright');
const sf = require("./stdUiComponents");
const data = require("./data.js");
let page, context, browser;

describe("Sales Cloud Testing", function () {
    before(async () => {
        browser = await chromium.launch({ args: ['--start-maximized', '--start-fullscreen'], headless: false, slowMo: 50 });
        context = await browser.newContext({ viewport: null, recordVideo: { dir: 'videos/' } });
        page = await context.newPage();
        const [login] = data.result.Login;
        await sf.login(page, login.Url, login.UserName, login.Password);
    });

    it("Click 'Casos' Menu", async () => {
        await page.click("//span[@class='slds-truncate' and text()='Casos']");
    });

    it("Click 'Novo' Button", async () => {
        await page.click("//*[@id='brandBand_1']/div/div/div/div/div[1]/div[1]/div[2]/ul/li[1]/a/div");
    });

    it("Selecionar 'Working'", async () => {
        const buttonSelector = "//button[@aria-label='Status']";
        await page.waitForSelector(buttonSelector, { timeout: 10000 });
        await page.click(buttonSelector);
        const optionSelector = "//span[contains(text(), 'Working')]";
        await page.waitForSelector(optionSelector, { timeout: 10000 });
        await page.click(optionSelector);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000); // Aguarda 1 segundo
    });

    it("Selecionar 'Origem do caso'", async () => {
        const buttonSelector = "//button[@aria-label='Origem do caso']";
        await page.waitForSelector(buttonSelector, { timeout: 10000 });
        await page.click(buttonSelector);
        const optionSelector = "//span[contains(text(), 'Telefone')]";
        await page.waitForSelector(optionSelector, { timeout: 10000 });
        await page.click(optionSelector);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000); // Aguarda 1 segundo
    });

    it("Selecionar 'Baixo'", async () => {
        const buttonSelector = "//button[@aria-label='Prioridade']";
        await page.waitForSelector(buttonSelector, { timeout: 10000 });
        await page.click(buttonSelector);
        const optionSelector = "//span[contains(text(), 'Baixo')]";
        await page.waitForSelector(optionSelector, { timeout: 10000 });
        await page.click(optionSelector);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000); // Aguarda 1 segundo
    });

    it("Preencher 'Nome do Contato' e clicar em 'Criar Contato'", async () => {
        const selector = 'input.slds-combobox__input'; // Seletor para o campo 'Nome do Contato'
        await page.waitForSelector(selector);
        await page.click(selector); // Clica no campo de entrada para abrir as opções
        await page.keyboard.press('ArrowDown'); // Pressiona a tecla de seta para baixo
        await page.keyboard.press('Enter'); // Pressiona a tecla Enter para selecionar a primeira opção
        
        // Aguarda o aparecimento do botão "Criar Contato"
        const criarContatoSelector = "//span[@title='Criar Contato']";
        try {
            await page.waitForSelector(criarContatoSelector, { timeout: 5000 });
            await page.click(criarContatoSelector);
            await page.waitForTimeout(1000); // Aguarda 1 segundo após clicar
        } catch (error) {
            console.log("O botão + Criar Contato não apareceu. Prossiga sem clicar.");
        }
        
        // Aguarda e clica no botão "Cancelar" dentro da camada de ação do modal
        const cancelButtonSelector = ".forceModalActionContainer--footerAction button[title='Cancelar']";
        try {
            await page.waitForSelector(cancelButtonSelector, { timeout: 10000 });
            await page.click(cancelButtonSelector);
            await page.waitForTimeout(1000); // Aguarda 1 segundo após clicar em Cancelar
        } catch (error) {
            console.log("O botão Cancelar não apareceu. Prossiga sem clicar.");
        }
    
        await page.keyboard.press('Tab'); // Avança para o próximo campo
    });

    it("Selecionar 'Criar Conta' no campo 'Nome da Conta' e clicar em 'Cancelar'", async () => {
        const selector = 'input[placeholder="Pesquisar Contas…"]'; // Seletor para o campo 'Nome da Conta'
        await page.waitForSelector(selector);
        await page.click(selector); // Clica no campo de entrada para abrir as opções
    
        await page.keyboard.press('ArrowDown'); // Pressiona a tecla de seta para baixo
        await page.waitForTimeout(500); // Aguarda meio segundo antes de pressionar Enter
        await page.keyboard.press('Enter'); // Pressiona a tecla Enter para selecionar a primeira opção
    
    // Verifica se a janela "Criar conta" está presente
    const criarContaSelector = 'h1.title.slds-text-heading_medium.slds-hyphenate';
    await page.waitForSelector(criarContaSelector);

    // Localiza e clica no botão "Cancelar" usando XPath
    const cancelarXPath = '/html/body/div[4]/div[2]/div[2]/div[2]/div/div[3]/div/button[1]/span';
    const cancelarButton = await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            element.click();
            return true;
        } else {
            return false;
        }
    }, cancelarXPath);

    if (cancelarButton) {
        console.log("Botão Cancelar clicado com sucesso.");
        await page.waitForTimeout(1000); // Aguarda 1 segundo após clicar em "Cancelar"
    } else {
        console.log("O botão Cancelar não apareceu. Prossiga sem clicar.");
    }

    
        await page.keyboard.press('Tab'); // Avança para o próximo campo se necessário
    });
    
    

    after(async () => {
         await context.close();
         await browser.close();
    });
});
