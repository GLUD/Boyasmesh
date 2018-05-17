'use strict';


angular.module('Forms', [])

.factory('formService', function() {

    return {
        register: {
            alumnos: function(data) {

                let inputs = [{
                        current: 'input',
                        class: {
                            Num1: 'col-md-12',
                                Num2: 'col-xs-12',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'documento',
                        icon: 'user',
                        place: 'Document RUN',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-6',
                                Num2: 'col-xs-12',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'name',
                        icon: 'header',
                        place: 'Nombre del Alumno',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-6',
                                Num2: 'col-xs-12',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'lastname',
                        icon: 'text-color',
                        place: 'Apellido del Alumno',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }
                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-6',
                                Num2: 'col-xs-12',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'address',
                        icon: 'map-marker',
                        place: 'Direccion del Alumno',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-6',
                                Num2: 'col-xs-12',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'email',
                        icon: 'envelope',
                        place: 'Email del Alumno',
                        type: 'email',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-6',
                                Num2: 'col-xs-12',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'password',
                        icon: 'lock',
                        place: 'Contraseña',
                        type: 'password',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-6',
                                Num2: 'col-xs-12',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'birthday',
                        icon: 'baby-formula',
                        place: 'Fecha de nacimiento',
                        type: 'date',
                        separator: true,
                        model: data,
                        required: { status: true }
                    }, {
                        current: 'btn',
                        class: {
                            Num1: 'col-md-6',
                                Num2: 'col-xs-12',
                                btn: 'btn btn-block',
                        },
                        place: 'Seleccione el apoderado',
                        separator: false
                    }, {
                        current: 'checkbox',
                        class: {
                            Num1: 'col-md-6',
                                Num2: 'col-xs-12',
                                checkbox: 'form-group',
                        },
                        typeModel: 'checkbox',
                        type: 'checkbox',
                        place: 'Matricula Activa',
                        separator: true,
                        model: data

                    }

                ];

                return inputs;
            },
            apoderados: function(data) {

                let inputs = [{
                        current: 'input',
                        class: {
                            Num1: 'col-md-12',
                                Num2: 'col-xs-12',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'documento',
                        icon: 'user',
                        place: 'Documento RUN',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-6',
                                Num2: 'col-xs-12',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'name',
                        icon: 'header',
                        place: 'Nombre del Apoderado',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-6',
                                Num2: 'col-xs-12',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'lastname',
                        icon: 'text-color',
                        place: 'Apellido del Apoderado',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }
                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-6',
                                Num2: 'col-xs-12',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'address',
                        icon: 'map-marker',
                        place: 'Direccion del Apoderado',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-6',
                                Num2: 'col-xs-12',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'email',
                        icon: 'envelope',
                        place: 'Email del Apoderado',
                        type: 'email',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-6',
                                Num2: 'col-xs-12',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'password',
                        icon: 'lock',
                        place: 'Contraseña',
                        type: 'password',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-6',
                                Num2: 'col-xs-12',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'telephone',
                        icon: 'earphone',
                        place: 'Telefono del Apoderado',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }
                    }, {
                        current: 'checkbox',
                        class: {
                            Num1: 'col-md-6',
                                Num2: 'col-xs-12',
                                checkbox: 'form-group',
                        },
                        typeModel: 'checkbox',
                        type: 'checkbox',
                        place: 'Estado',
                        separator: true,
                        model: data
                    }

                ];

                return inputs;
            },
            tutores: function(data) {

                let inputs = [{
                    current: 'input',
                    class: {
                        Num1: 'col-md-12',
                            Num2: 'col-xs-12',
                            group: 'input-group',
                            span: 'input-group-addon',
                            input: 'form-control'
                    },
                    typeModel: 'documento',
                    icon: 'user',
                    place: 'Documento RUN',
                    type: 'text',
                    separator: true,
                    model: data,
                    required: { status: true }

                }, {
                    current: 'input',
                    class: {
                        Num1: 'col-md-6',
                            Num2: 'col-xs-12',
                            group: 'input-group',
                            span: 'input-group-addon',
                            input: 'form-control'
                    },
                    typeModel: 'name',
                    icon: 'header',
                    place: 'Nombre del Tutor',
                    type: 'text',
                    separator: true,
                    model: data,
                    required: { status: true }

                }, {
                    current: 'input',
                    class: {
                        Num1: 'col-md-6',
                            Num2: 'col-xs-12',
                            group: 'input-group',
                            span: 'input-group-addon',
                            input: 'form-control'
                    },
                    typeModel: 'lastname',
                    icon: 'text-color',
                    place: 'Apellido del Tutor',
                    type: 'text',
                    separator: true,
                    model: data,
                    required: { status: true }
                }, {
                    current: 'input',
                    class: {
                        Num1: 'col-md-6',
                            Num2: 'col-xs-12',
                            group: 'input-group',
                            span: 'input-group-addon',
                            input: 'form-control'
                    },
                    typeModel: 'address',
                    icon: 'map-marker',
                    place: 'Direccion del Tutor',
                    type: 'text',
                    separator: true,
                    model: data,
                    required: { status: true }

                }, {
                    current: 'input',
                    class: {
                        Num1: 'col-md-6',
                            Num2: 'col-xs-12',
                            group: 'input-group',
                            span: 'input-group-addon',
                            input: 'form-control'
                    },
                    typeModel: 'email',
                    icon: 'envelope',
                    place: 'Email del Tutor',
                    type: 'email',
                    separator: true,
                    model: data,
                    required: { status: true }

                }, {
                    current: 'input',
                    class: {
                        Num1: 'col-md-6',
                            Num2: 'col-xs-12',
                            group: 'input-group',
                            span: 'input-group-addon',
                            input: 'form-control'
                    },
                    typeModel: 'password',
                    icon: 'lock',
                    place: 'Contraseña',
                    type: 'password',
                    separator: true,
                    model: data,
                    required: { status: true }

                }, {
                    current: 'input',
                    class: {
                        Num1: 'col-md-6',
                            Num2: 'col-xs-12',
                            group: 'input-group',
                            span: 'input-group-addon',
                            input: 'form-control'
                    },
                    typeModel: 'telephone',
                    icon: 'earphone',
                    place: 'Telefono del Tutor',
                    type: 'text',
                    separator: true,
                    model: data,
                    required: { status: true }
                }, {
                    current: 'checkbox',
                    class: {
                        Num1: 'col-md-6',
                            Num2: 'col-xs-12',
                            checkbox: 'form-group',
                    },
                    typeModel: 'checkbox',
                    type: 'checkbox',
                    place: 'Estado',
                    separator: true,
                    model: data
                }];

                return inputs;
            },
            materias: function(data) {
                let inputs = [{
                    current: 'input',
                    class: {
                        Num1: 'col-md-12',
                            Num2: 'col-xs-12',
                            group: 'input-group',
                            span: 'input-group-addon',
                            input: 'form-control'
                    },
                    typeModel: 'name',
                    icon: 'user',
                    place: 'Nombre de la Materia',
                    type: 'text',
                    separator: true,
                    model: data,
                    required: { status: true }

                }]

                return inputs;
            },
            cursos: function(data) {
                let inputs = [{
                    current: 'input',
                    class: {
                        Num1: 'col-md-12',
                            Num2: 'col-xs-12',
                            group: 'input-group',
                            span: 'input-group-addon',
                            input: 'form-control'
                    },
                    typeModel: 'name',
                    icon: 'user',
                    place: 'Nombre del Curso',
                    type: 'text',
                    separator: true,
                    model: data,
                    required: { status: true }

                }, {
                    current: 'btn',
                    class: {
                        Num1: 'col-md-12',
                            Num2: 'col-xs-12',
                            btn: 'btn btn-block',
                    },
                    place: 'Seleccione la Materia',
                    separator: false
                }]
                return inputs;
            },
            clases: function(data) {
                let inputs = [{
                    current: 'btn',
                    class: {
                        Num1: 'col-md-6',
                            Num2: 'col-xs-12',
                            btn: 'btn btn-block',
                    },
                    place: 'Seleccione el Curso',
                    separator: false
                },{
                    current: 'input',
                    class: {
                        Num1: 'col-md-6',
                            Num2: 'col-xs-12',
                            group: 'input-group',
                            span: 'input-group-addon',
                            input: 'form-control'
                    },
                    typeModel: 'name',
                    icon: 'user',
                    place: 'Nombre de la Clase',
                    type: 'text',
                    separator: true,
                    model: data,
                    required: { status: true }

                },{
                    current: 'textarea',
                    typeModel: 'content',
                    texts:[''],
                    place: 'Contenido del Curso',
                    separator: true,
                    model: data,
                    required: { status: true }

                },
                {
                    current: 'textarea',
                    typeModel: 'links',
                    texts:['Copie y pegue el enlace desde la url ejemplo : http://www.edukid.cl/blog/unanoticia/','separe cada url con un ´;´ ejemplo : http://www.ek.cl/blog/noticia1; http://www.ek.cl/blog/noticia2 '],
                    place: 'Enlaces de Interes',
                    separator: true,
                    model: data,
                    required: { status: true }

                },
                {
                    current: 'textarea',
                    typeModel: 'objetivos',
                    texts:['separe cada objetivo con un ´;´ ejemplo : objetivo 1; objetivo 2 '],
                    place: 'Objetivos del Curso',
                    separator: true,
                    model: data,
                    required: { status: true }

                }];


                return inputs;
            },
        },
        update: {
            alumnos: function(data) {
                let inputs = [{
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'documento',
                        icon: 'user',
                        place: 'Documento RUN',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'nombre',
                        icon: 'header',
                        place: 'Nombre del Alumno',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'apellido',
                        icon: 'text-color',
                        place: 'Apellido del Alumno',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }
                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'direccion',
                        icon: 'map-marker',
                        place: 'Direccion del Alumno',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'email',
                        icon: 'envelope',
                        place: 'Email del Alumno',
                        type: 'email',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'nacimiento',
                        icon: 'baby-formula',
                        place: 'Fecha de nacimiento',
                        type: 'date',
                        separator: true,
                        model: data,
                        required: { status: true }
                    }

                ];

                return inputs;
            },
            apoderados: function(data) {
                let inputs = [{
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'documento',
                        icon: 'user',
                        place: 'Documento RUN',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'nombre',
                        icon: 'header',
                        place: 'Nombre del Apoderado',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'apellido',
                        icon: 'text-color',
                        place: 'Apellido del Apoderado',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }
                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'direccion',
                        icon: 'map-marker',
                        place: 'Direccion del Apoderado',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'email',
                        icon: 'envelope',
                        place: 'Email del Apoderado',
                        type: 'email',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'telefono',
                        icon: 'earphone',
                        place: 'Telefono del Apoderado',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }
                    }

                ];

                return inputs;
            },
            tutores: function(data) {
                let inputs = [{
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'documento',
                        icon: 'user',
                        place: 'Documento RUN',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'nombre',
                        icon: 'header',
                        place: 'Nombre del Tutor',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'apellido',
                        icon: 'text-color',
                        place: 'Apellido del Tutor',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }
                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'direccion',
                        icon: 'map-marker',
                        place: 'Direccion del Tutor',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'email',
                        icon: 'envelope',
                        place: 'Email del Tutor',
                        type: 'email',
                        separator: true,
                        model: data,
                        required: { status: true }

                    }, {
                        current: 'input',
                        class: {
                            Num1: 'col-md-4',
                                Num2: 'col-xs-6',
                                group: 'input-group',
                                span: 'input-group-addon',
                                input: 'form-control'
                        },
                        typeModel: 'telefono',
                        icon: 'earphone',
                        place: 'Telefono del Tutor',
                        type: 'text',
                        separator: true,
                        model: data,
                        required: { status: true }
                    }

                ];

                return inputs;
            },
            materias:function(data){
                 let inputs = [{
                    current: 'input',
                    class: {
                        Num1: 'col-md-12',
                            Num2: 'col-xs-12',
                            group: 'input-group',
                            span: 'input-group-addon',
                            input: 'form-control'
                    },
                    typeModel: 'nombre',
                    icon: 'user',
                    place: 'Nombre de la Materia',
                    type: 'text',
                    separator: true,
                    model: data,
                    required: { status: true }

                }]

                return inputs;
            },
            cursos:function(data){
               let inputs = [{
                    current: 'input',
                    class: {
                        Num1: 'col-md-12',
                            Num2: 'col-xs-12',
                            group: 'input-group',
                            span: 'input-group-addon',
                            input: 'form-control'
                    },
                    typeModel: 'nombre',
                    icon: 'user',
                    place: 'Nombre del Curso',
                    type: 'text',
                    separator: true,
                    model: data,
                    required: { status: true }

                }]
                return inputs; 
            },
            clases:function(data){
                let inputs = [{
                    current: 'input',
                    class: {
                        Num1: 'col-md-12',
                            Num2: 'col-xs-12',
                            group: 'input-group',
                            span: 'input-group-addon',
                            input: 'form-control'
                    },
                    typeModel: 'nombre',
                    icon: 'user',
                    place: 'Nombre de la Clase',
                    type: 'text',
                    separator: true,
                    model: data,
                    required: { status: true }

                },{
                    current: 'textarea',
                    typeModel: 'contenido',
                    texts:[''],
                    place: 'Contenido del Curso',
                    separator: true,
                    model: data,
                    required: { status: true }

                },
                {
                    current: 'textarea',
                    typeModel: 'enlaces',
                    texts:['Copie y pegue el enlace desde la url ejemplo : http://www.edukid.cl/blog/unanoticia/','separe cada url con un ´;´ ejemplo : http://www.ek.cl/blog/noticia1; http://www.ek.cl/blog/noticia2 '],
                    place: 'Enlaces de Interes',
                    separator: true,
                    model: data,
                    required: { status: true }

                },
                {
                    current: 'textarea',
                    typeModel: 'objetivos',
                    texts:['separe cada objetivo con un ´;´ ejemplo : objetivo 1; objetivo 2 '],
                    place: 'Objetivos del Curso',
                    separator: true,
                    model: data,
                    required: { status: true }

                }];


                return inputs;
            },
        },
        panel: function(mensaje) {
            let panel = {
                correct: true,
                incorrect: true,
                mensaje: {
                    correct: '',
                    incorrect: mensaje
                }
            };

            return panel;
        },
        picture: function(title, btn, required,status=true) {
            let picture = {
                status: status,
                title: title,
                btn: [{
                    title: btn
                }],
                required: required,
            }

            return picture;
        },
        btnModal: function(title, subt, clas) {
            let btn = {
                title: title,
                subtclear: subt,
                mensaje: {},
                class: clas
            }
            return btn;
        }


    }


});