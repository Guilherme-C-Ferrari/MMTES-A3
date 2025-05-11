# Classe modelo para o usuario.
class Usuario():

    _nome : str
    _email : str
    _senha : str
    _data_de_nascimento : str
    _bio : str
    _nickname : str

    def __init__(self, nome: str, email: str, senha: str, data_de_nascimento: str ,bio: str, nickname: str):
        self._nome = nome
        self._email = email
        self._senha = senha
        self._data_de_nascimento = data_de_nascimento
        self._bio = bio
        self._nickname = nickname


