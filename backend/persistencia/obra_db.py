from backend.modelos.obra import Obra
from backend.persistencia.config_db import ConfigDB

# DB de obras aplicando singleton. Salva mudanças no banco de dados.
class ObraDB():

    _instance = None
    _lista_de_obra : list = []

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = ObraDB()
            cls._instance.popular_do_banco_de_obra()
        return cls._instance

    @classmethod
    def popular_do_banco_de_obra(cls):

        res = ConfigDB.executa_sql("SELECT id, titulo, descricao, autor, genero, capa, validada FROM Usuarios", False)

        for r in res:
            j : Obra = Obra(
                id=r[0],
                titulo=r[1],
                descricao=r[2],
                autor=r[3],
                genero=r[4],
                capa=r[5],
                validada=bool(r[6])
                
            )
            cls.get_instance()._lista_de_obra.append(j)
    
    @classmethod
    def listar_todas_as_obras(cls):
        return  cls.get_instance()._lista_de_obra
    
    @classmethod
    def inserir_obra_no_banco(cls, obra: Obra):
        sqlite_insert = """INSERT INTO Obras (titulo, descricao, autor, genero, capa, validada) VALUES (?, ?, ?, ?, ?, ?);"""
        valores = (obra._titulo, obra._descricao, obra._autor, obra._genero, obra._capa, int(obra._validada))
        ConfigDB.executa_sql(sqlite_insert, valores)
        
        cls.get_instance()._lista_de_obra.append(obra)
    
    @classmethod
    def editar_obra_no_banco_por_id(cls, id: int, titulo: str, descricao: str, genero: str, capa: str, validada: bool = None):
        lista_filtrada : list[Obra] = [x for x in  cls.get_instance()._lista_de_obra if x._id == id]
        if(len(lista_filtrada) == 0):
            return False
        else:
            obra_alvo : Obra = lista_filtrada[0]
            obra_alvo._titulo = titulo
            obra_alvo._descricao = descricao
            obra_alvo._genero = genero
            obra_alvo._capa = capa
            if validada is not None:
                obra_alvo._validada = validada

            sqlite_update = """UPDATE Obras SET titulo = ?, descricao = ?, genero = ?, capa = ?, validada = ? where id = ?"""
            valores = (obra_alvo._titulo, obra_alvo._descricao, obra_alvo._capa, obra_alvo._genero,int(obra_alvo._validada), obra_alvo._id)
            ConfigDB.executa_sql(sqlite_update, valores)
    
    @classmethod
    def remover_obra_do_banco_por_id(cls, id: int):
        lista_filtrada : list[Obra] = [x for x in  cls.get_instance()._lista_de_obra if x._id == id]
        if(len(lista_filtrada) == 0):
            return False
        else:
            obra_alvo : Obra = lista_filtrada[0]
            cls.get_instance()._lista_de_obra.remove(obra_alvo)
            sqlite_delete = """DELETE FROM Obras WHERE id = ?"""
            ConfigDB.executa_sql(sqlite_delete, (id,))