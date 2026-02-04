<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFPnet</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./login.css">
</head>
<body>
    <!-- ===== SECCION PRINCIPAL ===== -->
    <header class="hero">
        <div class="hero-container">
            <div class="sidebar-card">
                <div class="logo-container">
                    <svg class="logo-arc" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 38 Q50 -5 85 38" stroke="white" stroke-width="5" fill="none" stroke-linecap="round"/>
                        <path d="M25 38 Q50 5 75 38" stroke="white" stroke-width="4" fill="none" stroke-linecap="round"/>
                    </svg>
                    <div class="logo-text">AFPnet</div>
                    <div class="logo-subtitle">PAGO FÁCIL</div>
                </div>
                <nav class="sidebar-links">
                    <a href="#">¿QUÉ ES AFPNET?</a>
                    <a href="#">¿QUÉ HACE AFPNET?</a>
                    <a href="#">MANUAL DE USO</a>
                    <a href="#">REGISTRATE</a>
                </nav>
            </div>

            <div class="login-card">
                <h2 class="login-title">Iniciar Sesión</h2>

                <div class="tabs">
                    <button class="tab active" data-tab="empleador">Empleador</button>
                    <button class="tab" data-tab="afiliado">Afiliado</button>
                </div>

                <div class="tab-content active" id="tab-empleador">
                    <div class="form-error" id="form-error">
                        <i class="fas fa-exclamation-circle"></i>
                        <span id="error-text"></span>
                    </div>

                    <form id="frm-login-empleador">
                        <div class="form-group">
                            <label for="ruc">RUC:</label>
                            <input type="text" id="ruc" placeholder="RUC" maxlength="11" autocomplete="off" required>
                        </div>
                        <div class="form-group">
                            <label for="usuario">Usuario:</label>
                            <input type="text" id="usuario" placeholder="Usuario" maxlength="16" autocomplete="off" required>
                        </div>
                        <div class="form-group">
                            <label for="contrasenia">Contraseña:</label>
                            <input type="password" id="contrasenia" placeholder="Contraseña" maxlength="64" autocomplete="off" required>
                        </div>

                        <div class="form-group">
                            <div class="captcha-row">
                                <div class="captcha-img" id="captcha-display">45JL</div>
                                <button type="button" class="captcha-refresh" onclick="refreshCaptcha()" title="Refrescar captcha">
                                    <i class="fas fa-sync-alt"></i>
                                </button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="captcha-input">Texto de la imagen:</label>
                            <input type="text" id="captcha-input" placeholder="Texto de la imagen" maxlength="4" autocomplete="off" style="text-transform: uppercase;" required>
                        </div>

                        <button type="submit" class="btn-login" id="btn-ingresar">
                            <span class="spinner"></span>
                            <span class="btn-text">INGRESAR</span>
                        </button>

                        <div class="link-row">
                            <a href="#">¿Olvidaste tu contraseña?</a>
                        </div>
                        <div class="link-row" style="margin-top: 8px;">
                            <a href="#">¿Tu usuario se bloqueó?</a>
                        </div>
                    </form>
                </div>

                <div class="tab-content" id="tab-afiliado">
                    <div class="afiliado-message">
                        <i class="fas fa-user-circle"></i>
                        <p>Acceso para afiliados al Sistema Privado de Pensiones.</p>
                        <p style="margin-top: 8px; font-size: 13px;">Serás redirigido al portal de afiliados.</p>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- ===== SECCION DE SERVICIOS ===== -->
    <section class="services">
        <h2>Un servicio gratuito</h2>
        <hr class="services-divider">
        <div class="services-grid">
            <div class="service-item">
                <div class="service-icon">
                    <svg viewBox="0 0 64 64" fill="none"><rect x="8" y="12" width="48" height="36" rx="3" stroke="#1c3997" stroke-width="2.5" fill="none"/><line x1="8" y1="22" x2="56" y2="22" stroke="#1c3997" stroke-width="2"/><circle cx="14" cy="17" r="2" fill="#1c3997"/><circle cx="21" cy="17" r="2" fill="#1c3997"/><circle cx="28" cy="17" r="2" fill="#1c3997"/><rect x="16" y="28" width="20" height="3" rx="1" fill="#5dc2d4"/><rect x="16" y="34" width="14" height="3" rx="1" fill="#5dc2d4"/><path d="M42 38 L46 42 L54 30" stroke="#5dc2d4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <h5>Preparar</h5>
            </div>
            <div class="service-item">
                <div class="service-icon">
                    <svg viewBox="0 0 64 64" fill="none"><path d="M20 48 V20 Q20 14 26 14 Q28 14 28 18 V48" stroke="#1c3997" stroke-width="2.5" fill="none"/><path d="M28 48 V16 Q28 10 34 10 Q36 10 36 14 V48" stroke="#5dc2d4" stroke-width="2.5" fill="none"/><path d="M36 48 V22 Q36 16 42 16 Q44 16 44 20 V48" stroke="#1c3997" stroke-width="2.5" fill="none"/><rect x="18" y="16" width="4" height="8" rx="2" fill="#1c3997"/><rect x="26" y="10" width="4" height="12" rx="2" fill="#5dc2d4"/><rect x="34" y="18" width="4" height="6" rx="2" fill="#1c3997"/><line x1="12" y1="50" x2="52" y2="50" stroke="#ccc" stroke-width="1.5"/></svg>
                </div>
                <h5>Declarar</h5>
            </div>
            <div class="service-item">
                <div class="service-icon">
                    <svg viewBox="0 0 64 64" fill="none"><rect x="10" y="18" width="44" height="28" rx="3" stroke="#1c3997" stroke-width="2.5" fill="none"/><line x1="10" y1="28" x2="54" y2="28" stroke="#1c3997" stroke-width="2"/><rect x="16" y="32" width="16" height="8" rx="1" fill="#5dc2d4" opacity="0.5"/><text x="20" y="39" font-size="7" fill="#1c3997" font-weight="bold">$</text><path d="M40 50 L48 50 L48 42" stroke="#5dc2d4" stroke-width="2.5" stroke-linecap="round"/><circle cx="44" cy="46" r="6" stroke="#5dc2d4" stroke-width="2" fill="none"/></svg>
                </div>
                <h5>Pagar</h5>
            </div>
            <div class="service-item">
                <div class="service-icon">
                    <svg viewBox="0 0 64 64" fill="none"><circle cx="22" cy="22" r="7" stroke="#1c3997" stroke-width="2.5" fill="none"/><circle cx="42" cy="22" r="7" stroke="#1c3997" stroke-width="2.5" fill="none"/><circle cx="32" cy="20" r="8" stroke="#5dc2d4" stroke-width="2.5" fill="none"/><path d="M10 50 Q10 38 22 38" stroke="#1c3997" stroke-width="2.5" fill="none"/><path d="M54 50 Q54 38 42 38" stroke="#1c3997" stroke-width="2.5" fill="none"/><path d="M16 50 Q16 34 32 34 Q48 34 48 50" stroke="#5dc2d4" stroke-width="2.5" fill="none"/></svg>
                </div>
                <h5>Afiliados</h5>
            </div>
        </div>
    </section>

    <!-- ===== SECCION DE ACERCA DE NOSOTROS ===== -->
    <section class="about">
        <div class="about-image"></div>
        <div class="about-text">
            <h2>¿Qué hace AFPnet?</h2>
            <p>AFPnet permite al empleador preparar en forma automática las planillas de todas las AFP, presentarlas directamente a través de Internet y pagar los aportes previsionales.</p>
            <p>El empleador sólo tiene que introducir un archivo (Excel o de texto) con los datos mínimos de sus trabajadores afiliados y AFPnet preparará las planillas de todas las AFP, colocando automáticamente a cada trabajador en la AFP que corresponde y calculando los aportes.</p>
        </div>
    </section>

    <!-- ===== SECCION DE CLIENTES PRINCIPALES ===== -->
    <section class="afp-logos">
        <div class="afp-logos-grid">
            <a href="https://www.afphabitat.com.pe" target="_blank" class="afp-logo-item">
                <div class="logo-placeholder logo-habitat">
                    <small style="font-size:10px; display:block; font-weight:600;">AFP</small>HABITAT
                    <span>Afiliados a una vida mejor</span>
                </div>
            </a>
            <a href="https://www.integra.com.pe" target="_blank" class="afp-logo-item">
                <div class="logo-placeholder logo-integra">AFP <b>Integra</b><span>Una empresa Sura</span></div>
            </a>
            <a href="https://www.prima.com.pe" target="_blank" class="afp-logo-item">
                <div class="logo-placeholder logo-prima">PRIMA<sup>AFP</sup></div>
            </a>
            <a href="https://www.profuturo.com.pe" target="_blank" class="afp-logo-item">
                <div class="logo-placeholder logo-profuturo">Profuturo<span>AFP del grupo Scotiabank</span></div>
            </a>
        </div>
    </section>

    <!-- ===== SECCION DE CONTACTO ===== -->
    <section class="contact">
        <h2>Contáctanos</h2>
        <div class="contact-grid">
            <div class="contact-item">
                <div class="contact-icon whatsapp"><i class="fab fa-whatsapp"></i></div>
                <span>950 701 711</span>
            </div>
            <div class="contact-item">
                <div class="contact-icon phone"><i class="fas fa-headset"></i></div>
                <span>618-8384 &nbsp; 618-6989</span>
            </div>
            <div class="contact-item">
                <div class="contact-icon email"><i class="fas fa-paper-plane"></i></div>
                <span>consultas@afpnet.com.pe</span>
            </div>
        </div>
    </section>

    <!-- ===== SECCION DE REGISTRO ===== -->
    <section class="cta">
        <h4>¿Aún no tienes cuenta?</h4>
        <button class="btn-register">Registrate</button>
    </section>

    <!-- ===== FOOTER ===== -->
    <footer class="footer">
        <div class="footer-inner">
            <div class="footer-links">
                <a href="#">¿Qué es AFPnet?</a><span class="dot">⋅</span>
                <a href="#">¿Qué hace AFPnet?</a><span class="dot">⋅</span>
                <a href="#">Manual de Uso</a><span class="dot">⋅</span>
                <a href="#">Políticas de Cookies</a>
            </div>
            <p class="footer-copy">© AFPnet - Asociación de AFP's.</p>
        </div>
    </footer>
    <script src="./login.js"></script>
</body>
</html>
