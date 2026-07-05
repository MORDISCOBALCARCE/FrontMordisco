import {useState} from "react";
import {forgotPassword, resetPassword} from "../../../context/AuthContext/AuthContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function PassRecoveryModal({isOpen, onClose}: Props) {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(token, code, password);

      //alert("Contraseña actualizada");
      setSuccess("Contraseña actualizada correctamente");

    setTimeout(() => {
      setStep(1);
      setEmail("");
      setCode("");
      setPassword("");
      setShowPassword(false);
      setToken("");
      setSuccess("");
      onClose();
    }, 3000);

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
    setShowPassword(false);
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
       {success && (
     
        <div className="text-center py-6">
            <div className="text-5xl mb-4">✓</div>

            <h2 className="text-[24px] font-bold text-green-600 mb-3">
            Contraseña actualizada
            </h2>

            <p className="text-(--on-surface-variant) mb-6">
            Ya podés iniciar sesión con tu nueva contraseña.
            </p>

        </div>
        )}

        {step === 1 && (
          <>
            <p className="mb-4 text-(--on-surface-variant)">
              Ingresá tu email para recibir un código.<span className="text-red-500">*</span>
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

            <div className="relative group">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-(--on-surface-variant) hover:text-(--primary) focus:outline-none transition-colors z-20"
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? 'lock_open_right' : 'lock'}
              </button>

              <input
                className="w-full pl-12 pr-4 py-4 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default text-[16px] focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all placeholder:text-(--on-surface-variant)/40"
                type={showPassword ? "text" : "password"}
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleResetPassword}
              disabled={loading || !!success}
              className={`mt-5 w-full text-white py-4 rounded-full transition-all duration-300 ${
                loading || success
                  ? "bg-[#F15A24]/60 cursor-not-allowed shadow-none"
                  : "bg-[#F15A24] hover:opacity-90"
              }`}
            >
              {success ? "Actualizado ✓" : loading ? "Guardando..." : "Cambiar contraseña"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

