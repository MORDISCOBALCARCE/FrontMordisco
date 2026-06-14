import {useState} from "react";
import {forgotPassword, resetPassword} from "../../context/AuthContex";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function PasswordRecoveryModal({isOpen, onClose}: Props) {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSendCode() {
    setError("");
    if (!email.trim()) {
        setError('Debes ingresar un correo electrónico');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        setError('Debes ingresar un correo electrónico válido');
        return;
    }

    setLoading(true);

    try {
      const response = await forgotPassword(email);

      setToken(response.token);
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword() {
    setError("");
    setLoading(true);

    try {
      await resetPassword(token, code, password);

      alert("Contraseña actualizada");

      setStep(1);
      setEmail("");
      setCode("");
      setPassword("");
      setToken("");

      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setStep(1);
    setEmail("");
    setCode("");
    setPassword("");
    setToken("");
    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-(--p-md)">
      <div className="bg-(--surface-container-low) rounded-4xl p-(--p-xl) w-full max-w-120 glass-depth border border-(--outline-variant)/30">

        <div className="flex justify-between items-center mb-(--p-md)">
          <h2 className="text-[24px] font-bold text-(--on-surface)">
            Recuperar contraseña
          </h2>

          <button
            onClick={handleClose}
            className="text-(--on-surface-variant)"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 w-full p-3 rounded-default bg-red-500/10 border border-red-500/20 text-red-600">
            {error}
          </div>
        )}

        {step === 1 && (
          <>
            <p className="mb-4 text-(--on-surface-variant)">
              Ingresá tu email para recibir un código.
            </p>

            <input
              className="w-full px-4 py-4 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default"
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleSendCode}
              disabled={loading}
              className="mt-5 w-full bg-[#F15A24] text-white py-4 rounded-full"
            >
              {loading ? "Enviando..." : "Enviar código"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="mb-4 text-(--on-surface-variant)">
              Revisá tu correo e ingresá el código.
            </p>

            <input
              className="w-full px-4 py-4 mb-4 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default"
              placeholder="Código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <input
              className="w-full px-4 py-4 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default"
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="mt-5 w-full bg-[#F15A24] text-white py-4 rounded-full"
            >
              {loading ? "Guardando..." : "Cambiar contraseña"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

