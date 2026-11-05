
const mongoose = require('mongoose');

const avaliacaoSchema = new mongoose.Schema({
    livroId: {
        type: Number,
        required: [true, 'O ID do livro é obrigatório.'],
        min: [1, 'O ID do livro deve ser positivo.'],
        validate: {
            validator: Number.isInteger,
            message: 'O ID do livro deve ser um número inteiro.'
        }
    },

    usuarioId: {
        type: Number,
        required: [true, 'O ID do usuário é obrigatório.'],
        min: [1, 'O ID do usuário deve ser positivo.'],
        validate: {
            validator: Number.isInteger,
            message: 'O ID do usuário deve ser um número inteiro.'
        }
    },

    nota: {
        type: Number,
        required: [true, 'A nota é obrigatória.'],
        min: [1, 'A nota mínima é 1.'],
        max: [5, 'A nota máxima é 5.']
    },

    comentario: {
        type: String,
        required: [true, 'O comentário é obrigatório.'],
        trim: true,
        minlength: [3, 'O comentário deve ter pelo menos 3 caracteres.']
    },

    dataAvaliacao: {
        type: Date,
        default: Date.now
    }
});

const Avaliacao = mongoose.model('Avaliacao', avaliacaoSchema);

module.exports = Avaliacao;
