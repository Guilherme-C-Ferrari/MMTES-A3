from backend.persistencia.config_db import ConfigDB
from backend.modelos.capitulo import Capitulo

# DB de capitulos aplicando singleton. Salva mudanças no banco de dados.
class CapituloDB():
    _instance = None
    _lista_de_capitulo : list = []

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = CapituloDB()
            cls._instance.popular_do_banco_de_capitulo()
        return cls._instance

    @classmethod
    def popular_do_banco_de_capitulo(cls):

        res = ConfigDB.executa_sql("SELECT id, numero, titulo, imagem, obra_id, validado FROM Capitulos", False)

        for r in res:
            j : Capitulo = Capitulo(
                id=r[0],
                numero=r[1],
                titulo=r[2],
                imagem=r[3],
                obra_id=r[4],
                validado=bool(r[5])
                
            )
            cls.get_instance()._lista_de_capitulo.append(j)

    @classmethod
    def listar_todos_os_capitulos(cls):
        return  cls.get_instance()._lista_de_capitulo
    
    @classmethod
    def inserir_capitulo_no_banco(cls, capitulo: Capitulo):
        sqlite_insert = """INSERT INTO Capitulos (numero, titulo, imagem, obra_id, validado) VALUES (?, ?, ?, ?, ?);"""
        valores = (capitulo._numero, capitulo._titulo, capitulo._imagem, capitulo._obra_id, int(capitulo._validado))
        ConfigDB.executa_sql(sqlite_insert, valores)
        
        cls.get_instance()._lista_de_capitulo.append(capitulo)
    
    @classmethod
    def editar_capitulo_no_banco_por_id(cls, id: int, numero: float, titulo: str, imagem: list[str], obra_id: int, validado: bool = None):
        lista_filtrada : list[Capitulo] = [x for x in  cls.get_instance()._lista_de_capitulo if x._id == id]
        if(len(lista_filtrada) == 0):
            return False
        else:
            capitulo_alvo : Capitulo = lista_filtrada[0]
            capitulo_alvo._numero = numero
            capitulo_alvo._titulo = titulo
            capitulo_alvo._imagem = imagem
            capitulo_alvo._obra_id = obra_id
            if validado is not None:
                capitulo_alvo._validado = validado

            sqlite_update = """UPDATE Capitulos SET numero = ?, titulo = ?, imagem = ?, obra_id = ?, validado = ? WHERE id = ?;"""
            valores = (capitulo_alvo._numero, capitulo_alvo._titulo, capitulo_alvo._imagem, capitulo_alvo._obra_id, int(capitulo_alvo._validado), capitulo_alvo._id)
            ConfigDB.executa_sql(sqlite_update, valores)
    
    @classmethod
    def remover_capitulo_no_banco_por_id(cls, id: int):
        lista_filtrada : list[Capitulo] = [x for x in  cls.get_instance()._lista_de_capitulo if x._id == id]
        if(len(lista_filtrada) == 0):
            return False
        else:
            capitulo_alvo : Capitulo = lista_filtrada[0]
            sqlite_delete = """DELETE FROM Capitulos WHERE id = ?;"""
            valores = (capitulo_alvo._id,)
            ConfigDB.executa_sql(sqlite_delete, valores)
            cls.get_instance()._lista_de_capitulo.remove(capitulo_alvo)

            