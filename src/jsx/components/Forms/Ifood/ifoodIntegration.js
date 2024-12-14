import React, { useState } from "react";
import { getLinkIfood, postCodeIfood, unlinkIfood } from "../../../../services/IfoodService";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { updateIfoodIntegrationAction } from "../../../../store/actions/AuthActions";
import InputMask from "react-input-mask";

const IfoodIntegration = () => {
    const userData = useSelector((state) => state.auth.auth.data);
    const dispatch = useDispatch();
    const [verificationUrlComplete, setVerificationUrlComplete] = useState(null);
    const [userCode, setUserCode] = useState("");
    const [authorizationCodeVerifier, setAuthorizationCodeVerifier] = useState("");
    const [isGeneratingToken, setIsGeneratingToken] = useState(false);


    const resetForm = () => {
        setVerificationUrlComplete(null)
        setUserCode("")
        setAuthorizationCodeVerifier("")
        setIsGeneratingToken(false)
    }

    // Função para gerar o userCode
    const generateUserCode = async () => {
        try {
            const response = await getLinkIfood()
            const { verificationUrlComplete, authorizationCodeVerifier } = response.data;
            setVerificationUrlComplete(verificationUrlComplete);
            setAuthorizationCodeVerifier(authorizationCodeVerifier);
        } catch (error) {
            console.error("Erro ao gerar o código:", error);
            alert("Erro ao gerar o código. Tente novamente.");
        }
    };

    // Função para gerar o token
    const generateToken = async () => {
        if (!userCode || !authorizationCodeVerifier || userCode.length !== 9) {
            return;
        }

        setIsGeneratingToken(true);

        try {
            await postCodeIfood(userCode, authorizationCodeVerifier);
            dispatch(updateIfoodIntegrationAction(true));
            resetForm()
        } catch (error) {
            console.error("Erro ao gerar o token:", error);
            alert("Erro ao gerar o token. Verifique o código e tente novamente.");
        } finally {
            setIsGeneratingToken(false);
        }
    };

    // Função para desintegrar o iFood
    const handleUnlinkIfood = async () => {
        try {
            const confirmed = await Swal.fire({
                title: "Tem certeza?",
                text: "Ao desintegrar, todas as informações vinculadas ao iFood serão removidas.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim, desintegrar!",
                cancelButtonText: "Cancelar",
            });

            if (confirmed.isConfirmed) {
                await unlinkIfood();
                dispatch(updateIfoodIntegrationAction(false));
                Swal.fire("Desintegrado!", "A integração com o iFood foi removida.", "success");
            }
        } catch (error) {
            console.error("Erro ao desintegrar:", error);
            Swal.fire("Erro", "Houve um problema ao desintegrar a integração.", "error");
        }
    };

    return (
        <div className="d-flex justify-content-between align-items-center w-100 flex-column">
            <h3 style={{ textAlign: 'center' }}>Integração com iFood</h3>

            {userData.company.ifood_integration ? (
                <>
                    <div style={{ marginTop: "20px", display: 'flex', justifyContent: 'end' }}>
                        <label className="form-check form-switch align-items-center d-flex">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                onChange={handleUnlinkIfood}
                                checked={userData.company.ifood_integration}
                                style={{ marginRight: "10px", cursor: 'pointer' }}
                            />
                            Desintegrar iFood
                        </label>
                    </div>
                </>
            ) : (
                <div className="d-flex flex-column align-items-center">

                    {!verificationUrlComplete ? (
                        <button onClick={generateUserCode} className="btn btn-primary">
                            Integrar
                        </button>
                    ) : (
                        <div style={{ marginTop: "20px", textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p>
                                Clique no botão abaixo para autenticar com o iFood e gerar o código de autorização:
                            </p>
                            <a
                                href={verificationUrlComplete}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-success d-flex align-items-center justify-content-center"
                                style={{
                                    width: '80%',
                                    textDecoration: "none",
                                    padding: "8px",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    color: "#fff",
                                    borderRadius: "5px",
                                }}
                            >
                                <i className="fa fa-link" aria-hidden="true"></i>
                                Acessar iFood
                            </a>
                        </div>
                    )}

                    {authorizationCodeVerifier && (
                        <div className="d-flex flex-column align-items-center" style={{ marginTop: "20px" }}>
                            <h4>Inserir Código do iFood</h4>
                            <InputMask
                                mask="****-****"
                                placeholder="Código do iFood"
                                value={userCode}
                                onChange={(e) => setUserCode(e.target.value)}
                                className="form-control"
                                style={{ marginBottom: "10px", textTransform: 'uppercase', textAlign: 'center' }}
                            />
                            <button
                                onClick={generateToken}
                                className="btn btn-success"
                                disabled={isGeneratingToken}
                            >
                                {isGeneratingToken ? "Gerando Token..." : "Enviar Código"}
                            </button>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default IfoodIntegration;
