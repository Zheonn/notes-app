// Importação de módulos necessários
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Criação da instância do aplicativo Express
const app = express();
const port = 3000;

// Configuração de middleware para permitir requisições de diferentes origens (CORS)
app.use(cors());
// Configuração de middleware para realizar o parsing do corpo da requisição como JSON
app.use(bodyParser.json());

// Conexão com o banco de dados MongoDB utilizando Mongoose
mongoose.connect('sua-url-de-conexão');

// Definição do modelo Mongoose para a coleção 'notes'
const notes = mongoose.model('Note', {
    token: String,
    notes: Array,
}, 'notes');

// Rota para persistir/atualizar dados no banco de dados
app.post('/api/persistir-dados', async (req, res) => {
    const { token, notes: reqNotes } = req.body;

    try {
        // Verifica se existe um registro com o token fornecido
        const existingRecord = await notes.findOne({ token });

        if (existingRecord) {
            // Se existir, atualiza os dados correspondentes ao token
            const result = await notes.findOneAndUpdate(
                { token },
                { notes: reqNotes },
                { new: true } // Retorna o documento atualizado
            );
            res.json({ message: 'Dados atualizados com sucesso!', result });
        } else {
            // Se não existir, cria uma nova entrada no banco de dados
            const result = await notes.create({ token, notes: reqNotes });
            res.json({ message: 'Dados persistidos com sucesso!', result });
        }
    } catch (error) {
        console.error('Erro ao persistir/atualizar dados:', error);
        res.status(500).json({ error: 'Erro ao persistir/atualizar dados' });
    }
});

// Rota para recuperar dados com base no token
app.get('/api/recuperar-dados/:token', async (req, res) => {
    const { token } = req.params;

    // Consulta o banco de dados para encontrar um registro com o token fornecido
    const result = await notes.findOne({ token });

    // Retorna os dados associados ao token, ou um array vazio se nenhum registro for encontrado
    res.json(result ? result.notes : []);
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
