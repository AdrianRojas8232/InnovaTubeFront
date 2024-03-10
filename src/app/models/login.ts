export interface loginModel{
    correo: string;
    contrasenia: string;
}

export interface registerModel{
    nombre: string;
    ap_paterno: string;
    ap_materno: string;
    correo_electronico: string;
    fecha_nacimiento: Date;
    contrasenia: string;
    confirmarContrasenia: string;
    fecha_mod:Date;
    estatus:string;
}

export interface registroModelo{
    nombre_completo: string;
    contrasenia: string;
    correo_electronico: string;
    fecha_nacimiento: string;
}