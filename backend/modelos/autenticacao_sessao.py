# Classe modelo para sessões autenticadas.
class AutenticacaoSessao():
    _nome : str 
    _chave: str  
    _expiracao: object

    def __init__(self, nome, chave, expiracao):
        self._nome = nome
        self._chave = chave
        self._expiracao = expiracao