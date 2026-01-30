-- Insert Auto Título Sienge automation
INSERT INTO automations (name, description, status, category, icon_url, last_run, success_rate, next_run)
VALUES (
    'Auto Título Sienge',
    'Automação de Contas a Pagar que processa PDFs (IPTU, ITBI, Boletos), extrai dados via OCR/Regex e integra via API no Sienge.',
    'active',
    'Financeiro',
    'FileText', -- Using Lucide icon name as reference or a path if logic handles it
    NOW(),
    98.5,
    NOW() + INTERVAL '1 day'
);
