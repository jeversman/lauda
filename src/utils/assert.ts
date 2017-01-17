export default function assert(expr: boolean, message?: string): void {
    if (!expr) {
        const errorMessage = "Assertion error";
        throw new Error(message == null ? errorMessage :
            `${errorMessage}: ${message}`);
    }
}