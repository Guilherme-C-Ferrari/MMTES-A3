# Classe modelo para o usuario.
class Usuario():

    _nome : str
    _email : str
    _senha : str

    def __init__(self, nome: str, email: str, senha: str):
        self._nome = nome
        self._email = email
        self._senha = senha