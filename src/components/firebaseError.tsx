export function getFriendlyErrorMessage(errorCode: string): string {
    switch (errorCode) {
        case "auth/email-already-in-use":
            return "Este e-mail já está cadastrado. Tente outro ou recupere sua senha.";
        case "auth/invalid-email":
            return "E-mail inválido. Verifique o formato (ex: usuario@exemplo.com).";
        case "auth/weak-password":
            return "Senha muito fraca. Use pelo menos 6 caracteres.";
        default:
            return "Ocorreu um erro. Tente novamente mais tarde.";
    }
}