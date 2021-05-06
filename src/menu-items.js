export default {
  items: [
    {
        "id": 1,
        "title": "Home",
        "type": "item",
        "url": "/home",
        "classes": "nav-item",
        "icon": "feather icon-sidebar",
        "children": [],
        "accesos": {
            "actualizar": true,
            "ver": false,
            "agregar": false,
            "eliminar": false,
            "agregarArchivo": false
        }
    },
    {
        "id": 2,
        "title": "Catalogos",
        "type": "collapse",
        "url": null,
        "classes": "",
        "icon": "feather icon-list",
        "children": [
            {
                "id": 4,
                "title": "Personas",
                "type": "item",
                "url": "/personas",
                "classes": "nav-item",
                "icon": null,
                "children": [],
                "accesos": {
                    "actualizar": true,
                    "ver": false,
                    "agregar": false,
                    "eliminar": false,
                    "agregarArchivo": false
                }
            }
        ],
        "accesos": {
            "actualizar": true,
            "ver": false,
            "agregar": false,
            "eliminar": false,
            "agregarArchivo": false
        }
    },
    {
        "id": 3,
        "title": "Seguridad",
        "type": "collapse",
        "url": null,
        "classes": "",
        "icon": "feather icon-lock",
        "children": [
            {
                "id": 5,
                "title": "Usuarios",
                "type": "item",
                "url": "/usuarios",
                "classes": "nav-item",
                "icon": null,
                "children": [],
                "accesos": {
                    "actualizar": true,
                    "ver": false,
                    "agregar": false,
                    "eliminar": false,
                    "agregarArchivo": false
                }
            }
        ],
        "accesos": {
            "actualizar": true,
            "ver": false,
            "agregar": false,
            "eliminar": false,
            "agregarArchivo": false
        }
    },
    {
        "id": 6,
        "title": "Reportes",
        "type": "collapse",
        "url": null,
        "classes": "",
        "icon": "feather icon-book",
        "children": [
            {
                "id": 7,
                "title": "Reportes Varios",
                "type": "collapse",
                "url": null,
                "classes": "",
                "icon": "",
                "children": [
                    {
                        "id": 8,
                        "title": "Coincidencias",
                        "type": "item",
                        "url": "/reportes",
                        "classes": "nav-item",
                        "icon": null,
                        "children": [],
                        "accesos": {
                            "actualizar": true,
                            "ver": false,
                            "agregar": false,
                            "eliminar": false,
                            "agregarArchivo": false
                        }
                    }
                ],
                "accesos": {
                    "actualizar": true,
                    "ver": false,
                    "agregar": false,
                    "eliminar": false,
                    "agregarArchivo": false
                }
            }
        ],
        "accesos": {
            "actualizar": true,
            "ver": false,
            "agregar": false,
            "eliminar": false,
            "agregarArchivo": false
        }
    },
    {
        "id": 9,
        "title": "Identificados",
        "type": "collapse",
        "url": null,
        "classes": "",
        "icon": "feather icon-users",
        "children": [
            {
                "id": 10,
                "title": "Coincidencias",
                "type": "item",
                "url": "/coincidencias",
                "classes": "nav-item",
                "icon": null,
                "children": [],
                "accesos": {
                    "actualizar": true,
                    "ver": false,
                    "agregar": false,
                    "eliminar": false,
                    "agregarArchivo": false
                }
            },
            {
                "id": 11,
                "title": "Coincidencias Caso",
                "type": "item",
                "url": "/coincidenciasCaso",
                "classes": "nav-item",
                "icon": null,
                "children": [],
                "accesos": {
                    "actualizar": true,
                    "ver": false,
                    "agregar": false,
                    "eliminar": false,
                    "agregarArchivo": false
                }
            },
            {
                "id": 12,
                "title": "Osamentas",
                "type": "item",
                "url": "/osamentas",
                "classes": "nav-item",
                "icon": null,
                "children": [],
                "accesos": {
                    "actualizar": true,
                    "ver": false,
                    "agregar": false,
                    "eliminar": false,
                    "agregarArchivo": false
                }
            },
            {
                "id": 13,
                "title": "Victimas",
                "type": "item",
                "url": "/victimas",
                "classes": "nav-item",
                "icon": null,
                "children": [],
                "accesos": {
                    "actualizar": true,
                    "ver": false,
                    "agregar": false,
                    "eliminar": false,
                    "agregarArchivo": false
                }
            },
            {
                "id": 14,
                "title": "Identificados",
                "type": "item",
                "url": "/identificados",
                "classes": "nav-item",
                "icon": null,
                "children": [{
                    "id": 11,
                    "title": "Victimas",
                    "type": "item",
                    "url": "/victimas",
                    "classes": "nav-item",
                    "icon": null,
                    "children": [],
                    "accesos": {
                        "actualizar": true,
                        "ver": false,
                        "agregar": false,
                        "eliminar": false,
                        "agregarArchivo": false
                    }
                }],
                "accesos": {
                    "actualizar": true,
                    "ver": false,
                    "agregar": false,
                    "eliminar": false,
                    "agregarArchivo": false
                }
            },
            
        ],
        "accesos": {
            "actualizar": true,
            "ver": false,
            "agregar": false,
            "eliminar": false,
            "agregarArchivo": false
        }
    }
]
};
