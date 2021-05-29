package com.Legal_Advice.Controller;

import net.tanesha.recaptcha.ReCaptcha;
import net.tanesha.recaptcha.ReCaptchaFactory;
import net.tanesha.recaptcha.ReCaptchaImpl;
import net.tanesha.recaptcha.ReCaptchaResponse;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.Charset;
import org.json.JSONObject;
import com.Legal_Advice.Database.Encrypt;
import com.Legal_Advice.DAO.iAbogado;
import com.Legal_Advice.DAO.iContacto;
import com.Legal_Advice.DAO.iSugerencia;
import com.Legal_Advice.DAO.iUsuario;
import com.Legal_Advice.ImpDAO.ImpAbogado;
import com.Legal_Advice.ImpDAO.ImpContacto;
import com.Legal_Advice.ImpDAO.ImpSugerencia;
import com.Legal_Advice.ImpDAO.ImpUsuario;
import com.Legal_Advice.Mail.Email;
import com.Legal_Advice.Models.Abogado;
import com.Legal_Advice.Models.Usuario;
import com.Legal_Advice.Models.Sugerencia;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONException;
import org.owasp.esapi.ESAPI;

/**
 *
 * @author CARLOSHG
 */
@WebServlet(name = "Controller", urlPatterns = {"/Controller"})
public class Controller extends HttpServlet {

    private final iAbogado impabogado = new ImpAbogado();
    private final iSugerencia impsugerencia = new ImpSugerencia();
    private final iUsuario impusuario = new ImpUsuario();
    private final iContacto impcontacto = new ImpContacto();
    private final Encrypt cifrado = new Encrypt();
    private String login = "";
    private String su = "";
    private String sa = "";
    private String ac = "";
    private String au = "";
    private String aa = "";
    private String referer = "";

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            login = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/login.html";
            su = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/signin.html";
            sa = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/l_signin.html";
            ac = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/activation.jsp";
            au = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/home.jsp";
            aa = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/l_home.jsp";
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<link rel='stylesheet' href='css/styles_index.css'/>");
            out.println("<link rel='stylesheet' href='https://code.getmdl.io/1.3.0/material.red-light_blue.min.css'/>");
            out.println("<script src='js/legal_advice.js'></script>");
            out.println("<title>Servlet Controller</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>com.Legal_Advice Servlet Response: " + request.getContextPath() + "</h1>");
            referer = request.getHeader("Referer");
            out.print("<h2>" + referer + "</h2>");
            if (referer == null) {
                response.sendRedirect("http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/index.html");
            }
            if (request.getParameter("submitla") != null && !request.getParameter("submitla").equals("")) {

                out.print("<h3>" + request.getParameter("submitla") + "</h3>");

                if (request.getParameter("submitla").equals("Acceder") && referer.equals(login)) {

                    out.print("Login");
                    HttpSession sesion;
                    String locationu = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/home.jsp";
                    String locationa = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/l_home.jsp";
                    String locationf = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/for_pass.jsp";
                    String error = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/login.html";
                    int empty = 0;
                    String nombre = "";
                    if (!request.getParameter("user").equals("") && request.getParameter("user") != null) {
                        nombre = ESAPI.encoder().encodeForHTML(request.getParameter("user"));
                    } else {
                        ++empty;
                    }
                    String contra = "";
                    if (!request.getParameter("pass").equals("") && request.getParameter("pass") != null) {
                        contra = ESAPI.encoder().encodeForHTML(request.getParameter("pass"));
                    } else {
                        ++empty;
                    }
                    if (empty > 0) {
                        out.println("<script>invalid()</script>");
                        response.sendRedirect(error);
                    } else {
                        int id;
                        id = impusuario.login(nombre, contra);
                        if (id == 0) {
                            id = impabogado.login(nombre, contra);
                            if (id == 0) {
                                String nombreexiste = impusuario.readUsuario(impusuario.existanceUsuario(nombre)).getU_nombre();
                                if (nombreexiste != null) {
                                    response.sendRedirect(locationf + "?user=" + cifrado.encryptst(ESAPI.encoder().decodeForHTML(nombre)));
                                } else {
                                    nombreexiste = impabogado.readAbogado(impabogado.existanceAbogado(nombre)).getA_nombre();
                                    if (nombreexiste != null) {
                                        response.sendRedirect(locationf + "?user=" + cifrado.encryptst(ESAPI.encoder().decodeForHTML(nombre)));
                                    } else {
                                        out.println("<script>failedLogin();</script>");
                                        response.sendRedirect(error);
                                    }
                                }
                            } else {
                                sesion = request.getSession(true);
                                sesion.setAttribute("id", id);
                                String datocifrado = cifrado.encryptid(id);
                                response.sendRedirect(locationa + "?abogado_id=" + datocifrado);
                            }
                        } else {
                            sesion = request.getSession(true);
                            sesion.setAttribute("id", id);
                            String datocifrado = cifrado.encryptid(id);
                            response.sendRedirect(locationu + "?usuario_id=" + datocifrado);
                        }
                    }

                } else {

                    if (request.getParameter("submitla").equals("Registrar Usuario") && referer.equals(su)) {
                        HttpSession sesion;
                        out.print("Sign in usuario");
                        String location = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/home.jsp";
                        String error = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/signin.html";
                        int empty = 0;
                        String nombre = "";
                        if (!request.getParameter("user").equals("") && request.getParameter("user") != null) {
                            nombre = ESAPI.encoder().encodeForHTML(request.getParameter("user"));
                        } else {
                            ++empty;
                        }
                        String contra = "";
                        if (!request.getParameter("pass").equals("") && request.getParameter("pass") != null && request.getParameter("pass2") != null) {
                            contra = ESAPI.encoder().encodeForHTML(request.getParameter("pass"));
                        } else {
                            ++empty;
                        }
                        String correo = "";
                        if (!request.getParameter("mail").equals("") && request.getParameter("mail") != null) {
                            correo = ESAPI.encoder().encodeForHTML(request.getParameter("mail"));
                        } else {
                            ++empty;
                        }
                        String pregunta = "";
                        if (!request.getParameter("q").equals("") && request.getParameter("q") != null && (request.getParameter("q").equals("friend") || request.getParameter("q").equals("pet") || request.getParameter("q").equals("col"))) {
                            if (request.getParameter("q").equals("friend")) {
                                pregunta = "Nombre de tu mejor amigo de la infancia";
                            } else {
                                if (request.getParameter("q").equals("pet")) {
                                    pregunta = "Nombre de tu primer mascota";
                                } else if (request.getParameter("q").equals("col")) {
                                    pregunta = "Nombre de tu universidad";
                                }
                            }
                        } else {
                            ++empty;
                        }
                        String respuesta = "";
                        if (!request.getParameter("ans").equals("") && request.getParameter("ans") != null) {
                            respuesta = ESAPI.encoder().encodeForHTML(request.getParameter("ans"));
                        } else {
                            ++empty;
                        }
                        if (empty > 0) {
                            out.println("<script>invalid();</script>");
                            response.sendRedirect(error);
                        } else {
                            Usuario usuario = new Usuario(0, nombre, contra, correo, pregunta, respuesta, false);
                            boolean signin = impusuario.signin(usuario);
                            int usuario_id = impusuario.login(nombre, contra);
                            if (signin && impusuario.login(nombre, contra) != 0) {
                                sesion = request.getSession(true);
                                sesion.setAttribute("id", usuario_id);
                                String datocifrado = cifrado.encryptid(usuario_id);
                                String activationlink = ac + "?id=" + datocifrado;
                                Email email = new Email();
                                nombre = ESAPI.encoder().decodeForHTML(impusuario.readUsuario(usuario_id).getU_nombre());
                                correo = ESAPI.encoder().decodeForHTML(impusuario.readUsuario(usuario_id).getU_correo());
                                String de = "rushtechnologiessadecv@gmail.com";
                                String clave = "Rt2018cecyt9";
                                String mensaje = "Hola estimado: " + nombre + "\n" + "\n" + "Nos llena de gusto darte de bienvenida a Legal Advice," + "\n" + "Para concretar tu resgitro ingresa al siguiente link para activar tu cuenta" + "\n" + "\n" + activationlink + "\n" + "\n" + "Atte. Rush Tecnologies S.A. de C.V.";
                                String asunto = "Activación de su cuenta en Legal Advice";
                                try {
                                    boolean envio = email.enviarCorreo(de, clave, correo, mensaje, asunto);
                                    if (envio) {
                                        out.println("<script>mailContact();</script>");
                                    } else {
                                        out.println("<script>error();</script>");
                                    }
                                } catch (Exception e) {
                                    System.out.println(e.getMessage());
                                } finally {
                                    response.sendRedirect(location + "?usuario_id=" + datocifrado);
                                }
                            } else {
                                out.println("<script>exists();</script>");
                                response.sendRedirect(error);
                            }
                        }
                    } else {

                        if (request.getParameter("submitla").equals("Registrar Abogado") && referer.equals(sa)) {
                            HttpSession sesion;
                            out.print("sigin in abogado");
                            String location = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/l_home.jsp";
                            String error = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/l_signin.html";
                            int empty = 0;
                            String nombre = "";
                            if (!request.getParameter("user").equals("") && request.getParameter("user") != null) {
                                nombre = ESAPI.encoder().encodeForHTML(request.getParameter("user"));
                            } else {
                                ++empty;
                            }
                            String contra = "";
                            if (!request.getParameter("pass").equals("") && request.getParameter("pass") != null && request.getParameter("pass2") != null) {
                                contra = ESAPI.encoder().encodeForHTML(request.getParameter("pass"));
                            } else {
                                ++empty;
                            }
                            String correo = "";
                            if (!request.getParameter("mail").equals("") && request.getParameter("mail") != null) {
                                correo = ESAPI.encoder().encodeForHTML(request.getParameter("mail"));
                            } else {
                                ++empty;
                            }
                            String cedula = "";
                            if (!request.getParameter("ced").equals("") && request.getParameter("ced") != null) {
                                cedula = ESAPI.encoder().encodeForHTML(request.getParameter("ced"));
                            } else {
                                ++empty;
                            }
                            long telefono = 0;
                            if (!request.getParameter("ph").equals("") && request.getParameter("ph") != null) {
                                telefono = Long.parseLong(ESAPI.encoder().encodeForHTML(request.getParameter("ph")));
                            } else {
                                ++empty;
                            }
                            String pregunta = "";
                            if (!request.getParameter("q").equals("") && request.getParameter("q") != null && (request.getParameter("q").equals("friend") || request.getParameter("q").equals("pet") || request.getParameter("q").equals("col"))) {
                                if (request.getParameter("q").equals("friend")) {
                                    pregunta = "Nombre de tu mejor amigo de la infancia";
                                } else {
                                    if (request.getParameter("q").equals("pet")) {
                                        pregunta = "Nombre de tu primer mascota";
                                    } else if (request.getParameter("q").equals("col")) {
                                        pregunta = "Nombre de tu universidad";
                                    }
                                }
                            } else {
                                ++empty;
                            }
                            String respuesta = "";
                            if (!request.getParameter("ans").equals("") && request.getParameter("ans") != null) {
                                respuesta = ESAPI.encoder().encodeForHTML(request.getParameter("ans"));
                            } else {
                                ++empty;
                            }
                            if (empty > 0) {
                                out.println("<script>invalid();</script>");
                                response.sendRedirect(error);
                            } else {
                                Abogado abogado;
                                abogado = new Abogado(0, nombre, contra, correo, cedula, telefono, pregunta, respuesta, false);
                                boolean signin = impabogado.signin(abogado);
                                int abogado_id = impabogado.login(nombre, contra);
                                if (signin  && impabogado.login(nombre, contra) != 0) {
                                    sesion = request.getSession(true);
                                    sesion.setAttribute("id", abogado_id);
                                    String datocifrado = cifrado.encryptid(abogado_id);
                                    String activationlink = ac + "?id=" + datocifrado;
                                    Email email = new Email();
                                    nombre = ESAPI.encoder().decodeForHTML(impabogado.readAbogado(abogado_id).getA_nombre());
                                    correo = ESAPI.encoder().decodeForHTML(impabogado.readAbogado(abogado_id).getA_correo());
                                    String de = "rushtechnologiessadecv@gmail.com";
                                    String clave = "Rt2018cecyt9";
                                    String mensaje = "Hola estimado: " + nombre + "\n" + "\n" + "Nos llena de gusto darte de bienvenida a Legal Advice," + "\n" + "Para concretar tu resgitro ingresa al siguiente link para activar tu cuenta" + "\n" + "\n" + activationlink + "\n" + "\n" + "Atte. Rush Tecnologies S.A. de C.V.";
                                    String asunto = "Activación de su cuenta como abogado en Legal Advice";
                                    try {
                                        boolean envio = email.enviarCorreo(de, clave, correo, mensaje, asunto);
                                        if (envio) {
                                            out.println("<script>mailContact();</script>");
                                        } else {
                                            out.println("<script>error();</script>");
                                        }
                                    } catch (Exception e) {
                                        System.out.println(e.getMessage());
                                    } finally {
                                        response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                    }
                                } else {
                                    out.println("<script>exists();</script>");
                                    response.sendRedirect(error);
                                }
                            }
                        } else {

                            if (request.getParameter("submitla").substring(0, 8).equals("Contacto") && referer.contains(au)) {

                                HttpSession sesion = request.getSession();
                                int abogado_id = Integer.parseInt(cifrado.decrypt(request.getParameter("submitla").substring(8)));
                                int usuario_id = Integer.parseInt(sesion.getAttribute("id").toString());
                                String datocifrado = cifrado.encryptid(usuario_id);
                                String location = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/home.jsp";
                                if (impusuario.readUsuario(usuario_id).isU_activacion()) {
                                    boolean createContact = impcontacto.createContact(usuario_id, abogado_id);
                                    if (createContact) {
                                        Email email = new Email();
                                        String usuario = ESAPI.encoder().decodeForHTML(impusuario.readUsuario(usuario_id).getU_nombre());
                                        String correousuario = ESAPI.encoder().decodeForHTML(impusuario.readUsuario(usuario_id).getU_correo());
                                        String nombre = ESAPI.encoder().decodeForHTML(impabogado.readAbogado(abogado_id).getA_nombre());
                                        String correo = ESAPI.encoder().decodeForHTML(impabogado.readAbogado(abogado_id).getA_correo());
                                        String de = "rushtechnologiessadecv@gmail.com";
                                        String clave = "Rt2018cecyt9";
                                        String mensaje = "Hola estimado: " + nombre + "\n" + "\n" + "Se ha recibido una solicitud de contacto en Legal Advice por " + usuario + "," + "\n" + "El correo de contacto de " + usuario + " es: " + correousuario + "\n" + "\n" + "Se le sugiere contactarle a la brevedad para hacerle saber si le es posible tomar su caso o no." + "\n" + "\n" + "Atte. Rush Tecnologies S.A. de C.V.";
                                        String asunto = "Ha sido contactado por un usuario en Legal Advice";
                                        try {
                                            boolean envio = email.enviarCorreo(de, clave, correo, mensaje, asunto);
                                            if (envio) {
                                                out.println("<script>mailContact();</script>");
                                            } else {
                                                out.println("<script>error();</script>");
                                            }
                                        } catch (Exception e) {
                                            System.out.println(e.getMessage());
                                        } finally {
                                            response.sendRedirect(location + "?usuario_id=" + datocifrado + "#Contacto");
                                        }
                                    } else {
                                        out.println("<script>error();</script>");
                                        response.sendRedirect(location + "?usuario_id=" + datocifrado);
                                    }
                                } else {
                                    out.println("<script>error();</script>");
                                    response.sendRedirect(location + "?usuario_id=" + datocifrado);
                                }

                            } else {

                                if (request.getParameter("submitla").substring(0, 8).equals("RevisaCo") && referer.contains(aa)) {

                                    HttpSession sesion = request.getSession();
                                    int usuario_id = Integer.parseInt(cifrado.decrypt(request.getParameter("submitla").substring(8)));
                                    int abogado_id = Integer.parseInt(sesion.getAttribute("id").toString());
                                    String datocifrado = cifrado.encryptid(abogado_id);
                                    String location = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/l_home.jsp";
                                    boolean update = impcontacto.updateContact(usuario_id, abogado_id, "Revisado");
                                    if (impabogado.readAbogado(abogado_id).isA_activacion()) {
                                        if (update) {
                                            out.println("<script>checked();</script>");
                                            Email email = new Email();
                                            String nombre = ESAPI.encoder().decodeForHTML(impusuario.readUsuario(usuario_id).getU_nombre());
                                            String correo = ESAPI.encoder().decodeForHTML(impusuario.readUsuario(usuario_id).getU_correo());
                                            String abogado = ESAPI.encoder().decodeForHTML(impabogado.readAbogado(abogado_id).getA_nombre());
                                            String correoabogado = ESAPI.encoder().decodeForHTML(impabogado.readAbogado(abogado_id).getA_correo());
                                            String de = "rushtechnologiessadecv@gmail.com";
                                            String clave = "Rt2018cecyt9";
                                            String mensaje = "Hola estimado: " + nombre + "\n" + "\n" + "Se ha revisado tu solicitud de contacto en Legal Advice a " + abogado + "," + "\n" + "El correo de contacto de " + abogado + " es: " + correoabogado + "\n" + "\n" + "Se le sugiere contactarle a la brevedad para hacerle saber a " + abogado + " su situación y llegar a un acuerdo para tomar su caso." + "\n" + "\n" + "Atte. Rush Tecnologies S.A. de C.V.";
                                            String asunto = "Han revisado su intento de contacto en Legal Advice";
                                            try {
                                                boolean envio = email.enviarCorreo(de, clave, correo, mensaje, asunto);
                                                if (envio) {
                                                    out.println("<script>mailContact();</script>");
                                                } else {
                                                    out.println("<script>error();</script>");
                                                }
                                            } catch (Exception e) {
                                                System.out.println("Error: " + e.getMessage());
                                            } finally {
                                                response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                            }
                                        } else {
                                            out.println("<script>error();</script>");
                                            response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                        }
                                    } else {
                                        out.println("<script>error();</script>");
                                        response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                    }

                                } else {

                                    if (request.getParameter("submitla").equals("Actualizar datos del usuario") && referer.contains(au)) {

                                        HttpSession sesion = request.getSession();
                                        out.println("Update usuario");
                                        String location = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/home.jsp";
                                        int usuario_id = Integer.parseInt(sesion.getAttribute("id").toString());
                                        String datocifrado = cifrado.encryptid(usuario_id);
                                        int empty = 0;
                                        String nombre = "";
                                        if (!request.getParameter("user").equals("") && request.getParameter("user") != null) {
                                            nombre = ESAPI.encoder().encodeForHTML(request.getParameter("user"));
                                        } else {
                                            ++empty;
                                        }
                                        String contra = "";
                                        if (!request.getParameter("pass").equals("") && request.getParameter("pass") != null) {
                                            contra = ESAPI.encoder().encodeForHTML(request.getParameter("pass"));
                                        } else {
                                            ++empty;
                                        }
                                        String correo = "";
                                        if (!request.getParameter("mail").equals("") && request.getParameter("mail") != null) {
                                            correo = ESAPI.encoder().encodeForHTML(request.getParameter("mail"));
                                        } else {
                                            ++empty;
                                        }
                                        String pregunta = "";
                                        if (!request.getParameter("q").equals("") && request.getParameter("q") != null && (request.getParameter("q").equals("friend") || request.getParameter("q").equals("pet") || request.getParameter("q").equals("col"))) {
                                            if (request.getParameter("q").equals("friend")) {
                                                pregunta = "Nombre de tu mejor amigo de la infancia";
                                            } else {
                                                if (request.getParameter("q").equals("pet")) {
                                                    pregunta = "Nombre de tu primer mascota";
                                                } else if (request.getParameter("q").equals("col")) {
                                                    pregunta = "Nombre de tu universidad";
                                                }
                                            }
                                        } else {
                                            ++empty;
                                        }
                                        String respuesta = "";
                                        if (!request.getParameter("ans").equals("") && request.getParameter("ans") != null) {
                                            respuesta = ESAPI.encoder().encodeForHTML(request.getParameter("ans"));
                                        } else {
                                            ++empty;
                                        }
                                        if (empty > 0) {
                                            out.println("<script>invalid();</script>");
                                            response.sendRedirect(location + "?usuario_id=" + datocifrado);
                                        } else {
                                            if (ESAPI.encoder().decodeForHTML(contra).equals(sesion.getAttribute("pass").toString())) {
                                                if (impusuario.readUsuario(usuario_id).isU_activacion()) {
                                                    Usuario usuario = new Usuario(usuario_id, nombre, contra, correo, pregunta, respuesta, true);
                                                    boolean update = impusuario.updateUsuario(usuario);
                                                    if (update) {
                                                        out.println("<script>updated();</script>");
                                                        response.sendRedirect(location + "?usuario_id=" + datocifrado);
                                                    } else {
                                                        out.println("<script>error();</script>");
                                                        response.sendRedirect(location + "?usuario_id=" + datocifrado);
                                                    }
                                                } else {
                                                    out.println("<script>error();</script>");
                                                    response.sendRedirect(location + "?usuario_id=" + datocifrado);
                                                }

                                            } else {
                                                out.println("<script>failedlogin();</script>");
                                                response.sendRedirect(location + "?usuario_id=" + datocifrado);
                                            }
                                        }

                                    } else {

                                        if (request.getParameter("submitla").equals("Actualizar usuario") && referer.contains(au)) {

                                            HttpSession sesion = request.getSession();
                                            out.println("Update Password usuario");
                                            String location = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/home.jsp";
                                            int usuario_id = Integer.parseInt(sesion.getAttribute("id").toString());
                                            String datocifrado = cifrado.encryptid(usuario_id);
                                            int empty = 0;
                                            String contra = "";
                                            if (!request.getParameter("pass2").equals("") && request.getParameter("pass2") != null) {
                                                contra = ESAPI.encoder().encodeForHTML(request.getParameter("pass2"));
                                            } else {
                                                ++empty;
                                            }
                                            String ncontra = "";
                                            if (!request.getParameter("npass").equals("") && request.getParameter("npass") != null && request.getParameter("npass2") != null) {
                                                ncontra = ESAPI.encoder().encodeForHTML(request.getParameter("npass"));
                                            } else {
                                                ++empty;
                                            }
                                            if (empty > 0) {
                                                out.println("<script>invalid();</script>");
                                                response.sendRedirect(location + "?usuario_id=" + datocifrado);
                                            } else {
                                                if (ESAPI.encoder().decodeForHTML(contra).equals(sesion.getAttribute("pass").toString())) {
                                                    if (impusuario.readUsuario(usuario_id).isU_activacion()) {
                                                        boolean update = impusuario.updateUsuarioPass(usuario_id, ncontra);
                                                        if (update) {
                                                            sesion.setAttribute("pass", ncontra);
                                                            out.println("<script>updatedPass();</script>");
                                                            response.sendRedirect(location + "?usuario_id=" + datocifrado);
                                                        } else {
                                                            out.println("<script>error();</script>");
                                                            response.sendRedirect(location + "?usuario_id=" + datocifrado);
                                                        }
                                                    } else {
                                                        out.println("<script>error();</script>");
                                                        response.sendRedirect(location + "?usuario_id=" + datocifrado);
                                                    }

                                                } else {
                                                    out.println("<script>failedlogin();</script>");
                                                    response.sendRedirect(location + "?usuario_id=" + datocifrado);
                                                }
                                            }

                                        } else {

                                            if (request.getParameter("submitla").equals("Actualizar datos del abogado") && referer.contains(aa)) {

                                                HttpSession sesion = request.getSession();
                                                out.println("Update abogado");
                                                String location = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/l_home.jsp";
                                                int abogado_id = Integer.parseInt(sesion.getAttribute("id").toString());
                                                String datocifrado = cifrado.encryptid(abogado_id);
                                                int empty = 0;
                                                String nombre = "";
                                                if (!request.getParameter("user").equals("") && request.getParameter("user") != null) {
                                                    nombre = ESAPI.encoder().encodeForHTML(request.getParameter("user"));
                                                } else {
                                                    ++empty;
                                                }
                                                String contra = "";
                                                if (!request.getParameter("pass").equals("") && request.getParameter("pass") != null) {
                                                    contra = ESAPI.encoder().encodeForHTML(request.getParameter("pass"));
                                                } else {
                                                    ++empty;
                                                }
                                                String correo = "";
                                                if (!request.getParameter("mail").equals("") && request.getParameter("mail") != null) {
                                                    correo = ESAPI.encoder().encodeForHTML(request.getParameter("mail"));
                                                } else {
                                                    ++empty;
                                                }
                                                String cedula = "";
                                                if (!request.getParameter("ced").equals("") && request.getParameter("ced") != null) {
                                                    cedula = ESAPI.encoder().encodeForHTML(request.getParameter("ced"));
                                                } else {
                                                    ++empty;
                                                }
                                                long telefono = 0;
                                                if (!request.getParameter("ph").equals("") && request.getParameter("ph") != null) {
                                                    telefono = Long.parseLong(ESAPI.encoder().encodeForHTML(request.getParameter("ph")));
                                                } else {
                                                    ++empty;
                                                }
                                                String pregunta = "";
                                                if (!request.getParameter("q").equals("") && request.getParameter("q") != null && (request.getParameter("q").equals("friend") || request.getParameter("q").equals("pet") || request.getParameter("q").equals("col"))) {
                                                    if (request.getParameter("q").equals("friend")) {
                                                        pregunta = "Nombre de tu mejor amigo de la infancia";
                                                    } else {
                                                        if (request.getParameter("q").equals("pet")) {
                                                            pregunta = "Nombre de tu primer mascota";
                                                        } else if (request.getParameter("q").equals("col")) {
                                                            pregunta = "Nombre de tu universidad";
                                                        }
                                                    }
                                                } else {
                                                    ++empty;
                                                }
                                                String respuesta = "";
                                                if (!request.getParameter("ans").equals("") && request.getParameter("ans") != null) {
                                                    respuesta = ESAPI.encoder().encodeForHTML(request.getParameter("ans"));
                                                } else {
                                                    ++empty;
                                                }
                                                if (empty > 0) {
                                                    out.println("<script>invalid();</script>");
                                                    response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                } else {

                                                    if (ESAPI.encoder().decodeForHTML(contra).equals(sesion.getAttribute("pass").toString())) {
                                                        if (impabogado.readAbogado(abogado_id).isA_activacion()) {
                                                            Abogado abogado = new Abogado(abogado_id, nombre, contra, correo, cedula, telefono, pregunta, respuesta, true);
                                                            boolean update = impabogado.updateAbogado(abogado);
                                                            if (update) {
                                                                out.println("<script>updated();</script>");
                                                                response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                            } else {
                                                                out.println("<script>error();</script>");
                                                                response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                            }
                                                        } else {
                                                            out.println("<script>error();</script>");
                                                            response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                        }
                                                    } else {
                                                        out.println("<script>failedlogin();</script>");
                                                        response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                    }

                                                }

                                            } else {

                                                if (request.getParameter("submitla").equals("Actualizar abogado") && referer.contains(aa)) {

                                                    HttpSession sesion = request.getSession();
                                                    out.println("Update Password abogado");
                                                    String location = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/l_home.jsp";
                                                    int abogado_id = Integer.parseInt(sesion.getAttribute("id").toString());
                                                    String datocifrado = cifrado.encryptid(abogado_id);
                                                    int empty = 0;
                                                    String contra = "";
                                                    if (!request.getParameter("pass2").equals("") && request.getParameter("pass2") != null) {
                                                        contra = ESAPI.encoder().encodeForHTML(request.getParameter("pass2"));
                                                    } else {
                                                        ++empty;
                                                    }
                                                    String ncontra = "";
                                                    if (!request.getParameter("npass").equals("") && request.getParameter("npass") != null && request.getParameter("npass2") != null) {
                                                        ncontra = ESAPI.encoder().encodeForHTML(request.getParameter("npass"));
                                                    } else {
                                                        ++empty;
                                                    }
                                                    if (empty > 0) {
                                                        out.println("<script>invalid();</script>");
                                                        response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                    } else {
                                                        if (ESAPI.encoder().decodeForHTML(contra).equals(sesion.getAttribute("pass").toString())) {
                                                            if (impabogado.readAbogado(abogado_id).isA_activacion()) {
                                                                boolean update = impabogado.updateAbogadoPass(abogado_id, ncontra);
                                                                if (update && impabogado.readAbogado(abogado_id).isA_activacion()) {
                                                                    sesion.setAttribute("pass", ncontra);
                                                                    out.println("<script>updatedPass()</script>");
                                                                    response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                                } else {
                                                                    out.println("<script>error();</script>");
                                                                    response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                                }
                                                            } else {
                                                                out.println("<script>error();</script>");
                                                                response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                            }
                                                        } else {
                                                            out.println("<script>failedlogin();</script>");
                                                            response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                        }
                                                    }

                                                } else {

                                                    if (request.getParameter("submitla").equals("Registrar nueva sugerencia") && referer.contains(aa)) {

                                                        out.print("Registrar nueva sugerencia");
                                                        HttpSession sesion = request.getSession();
                                                        String location = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/l_home.jsp";
                                                        int abogado_id = Integer.parseInt(sesion.getAttribute("id").toString());
                                                        String datocifrado = cifrado.encryptid(abogado_id);
                                                        int empty = 0;
                                                        String categoria = "";
                                                        if (!request.getParameter("categoria").equals("") && request.getParameter("categoria") != null && (request.getParameter("categoria").equals("emergencias") || request.getParameter("categoria").equals("transito") || request.getParameter("categoria").equals("denuncias") || request.getParameter("categoria").equals("tramites"))) {
                                                            categoria = ESAPI.encoder().encodeForHTML(request.getParameter("categoria"));
                                                        } else {
                                                            ++empty;
                                                        }
                                                        String titulo = "";
                                                        if (!request.getParameter("titulo").equals("") && request.getParameter("titulo") != null) {
                                                            titulo = ESAPI.encoder().encodeForHTML(request.getParameter("titulo"));
                                                        } else {
                                                            ++empty;
                                                        }
                                                        String sugerenciast = "";
                                                        if (!request.getParameter("sugerencia").equals("") && request.getParameter("sugerencia") != null) {
                                                            sugerenciast = ESAPI.encoder().encodeForHTML(request.getParameter("sugerencia"));
                                                        } else {
                                                            ++empty;
                                                        }
                                                        if (empty > 0) {
                                                            out.println("<script>invalid();</script>");
                                                            response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                        } else {
                                                            Sugerencia sugerencia = new Sugerencia(0, sugerenciast, titulo, categoria, 0, abogado_id);
                                                            if (impabogado.readAbogado(abogado_id).isA_activacion()) {
                                                                boolean create = impsugerencia.createSugerencia(sugerencia);
                                                                if (create) {
                                                                    out.println("<script>ns();</script>");
                                                                    response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                                } else {
                                                                    out.println("<script>error();</script>");
                                                                    response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                                }
                                                            } else {
                                                                out.println("<script>error();</script>");
                                                                response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                            }
                                                        }

                                                    } else {

                                                        if (request.getParameter("submitla").substring(0, 7).equals("Aprobar") && referer.contains(aa)) {

                                                            out.println("Aprobar sugerencias");
                                                            HttpSession sesion = request.getSession();
                                                            int sg_id = Integer.parseInt(cifrado.decrypt(request.getParameter("submitla").substring(7)));
                                                            int abogado_id = Integer.parseInt(sesion.getAttribute("id").toString());
                                                            String datocifrado = cifrado.encryptid(abogado_id);
                                                            String location = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/l_home.jsp";
                                                            if (impabogado.readAbogado(abogado_id).isA_activacion()) {
                                                                boolean update = impsugerencia.updateAprobacionSugerencia(sg_id, abogado_id);
                                                                if (update) {
                                                                    out.println("<script>as();</script>");
                                                                    response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                                } else {
                                                                    out.println("<script>error();</script>");
                                                                    response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                                }
                                                            } else {
                                                                out.println("<script>error();</script>");
                                                                response.sendRedirect(location + "?abogado_id=" + datocifrado);
                                                            }

                                                        } else {

                                                            if (request.getParameter("submitla").equals("Activacion") && referer.contains(ac)) {

                                                                out.print("Activate");
                                                                HttpSession sesion = request.getSession();
                                                                String locationu = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/home.jsp";
                                                                String locationa = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/l_home.jsp";
                                                                String locationf = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/for_pass.jsp";
                                                                String error = "http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/activation.jsp";
                                                                int id = 0;
                                                                id = Integer.parseInt(sesion.getAttribute("id").toString());
                                                                int empty = 0;
                                                                String contra = "";
                                                                if (!request.getParameter("pass").equals("") && request.getParameter("pass") != null) {
                                                                    contra = ESAPI.encoder().encodeForHTML(request.getParameter("pass"));
                                                                } else {
                                                                    ++empty;
                                                                }
                                                                boolean activate = false;
                                                                if (!request.getParameter("g-recaptcha-response").equals("") && request.getParameter("g-recaptcha-response") != null) {
                                                                    activate = isCaptchaValid(request.getParameter("g-recaptcha-response"));
                                                                } else {
                                                                    if (!request.getParameter("grec").equals("") && request.getParameter("grec") != null) {
                                                                        activate = isCaptchaValid(request.getParameter("grec"));
                                                                    } else {
                                                                        ++empty;
                                                                    }
                                                                }
                                                                if (empty > 0) {
                                                                    String datocifrado = cifrado.encryptid(id);
                                                                    out.println("<script>invalid();</script>");
                                                                    response.sendRedirect(error + "?id=" + datocifrado);
                                                                } else {
                                                                    if (impusuario.readUsuario(id) != null && impusuario.readUsuario(id).getU_contra().equals(contra)) {
                                                                        Usuario usuario = impusuario.readUsuario(id);
                                                                        usuario.setU_activacion(activate);
                                                                        boolean update = impusuario.updateUsuario(usuario);
                                                                        if (update) {
                                                                            sesion.setAttribute("id", id);
                                                                            String datocifrado = cifrado.encryptid(id);
                                                                            response.sendRedirect(locationu + "?usuario_id=" + datocifrado);
                                                                        }
                                                                    } else {
                                                                        if (impabogado.readAbogado(id) != null && impabogado.readAbogado(id).getA_contra().equals(contra)) {
                                                                            Abogado abogado = impabogado.readAbogado(id);
                                                                            abogado.setA_activacion(activate);
                                                                            boolean update = impabogado.updateAbogado(abogado);
                                                                            if (update) {
                                                                                sesion.setAttribute("id", id);
                                                                                String datocifrado = cifrado.encryptid(id);
                                                                                response.sendRedirect(locationa + "?abogado_id=" + datocifrado);
                                                                            }
                                                                        } else {
                                                                            String nombre = impusuario.readUsuario(id).getU_nombre();
                                                                            String nombreexiste = impusuario.readUsuario(impusuario.existanceUsuario(nombre)).getU_nombre();
                                                                            if (nombreexiste != null) {
                                                                                response.sendRedirect(locationf + "?user=" + cifrado.encryptst(ESAPI.encoder().decodeForHTML(nombre)));
                                                                            } else {
                                                                                nombre = impabogado.readAbogado(id).getA_nombre();
                                                                                nombreexiste = impabogado.readAbogado(impabogado.existanceAbogado(nombre)).getA_nombre();
                                                                                if (nombreexiste != null) {
                                                                                    response.sendRedirect(locationf + "?user=" + cifrado.encryptst(ESAPI.encoder().decodeForHTML(nombre)));
                                                                                } else {
                                                                                    out.println("<script>failedLogin();</script>");
                                                                                    String datocifrado = cifrado.encryptid(id);
                                                                                    response.sendRedirect(error + "?id=" + datocifrado);
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }

                                                            } else {

                                                                response.sendRedirect("http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/index.html");

                                                            }

                                                        }

                                                    }

                                                }

                                            }

                                        }

                                    }

                                }

                            }

                        }

                    }

                }

            } else {
                response.sendRedirect("http://localhost:" + request.getLocalPort() + "/com.Legal_Advice/index.html");
            }
            out.println("</body>");
            out.println("</html>");
        }
    }

    /**
     * Validates Google reCAPTCHA V2.
     *
     * @param response reCAPTCHA response from client side.
     * (g-recaptcha-response)
     * @return true if validation successful, false otherwise.
     */
    public boolean isCaptchaValid(String response) {
        String secretKey = "6LdM9pEUAAAAAKeBxFReNsZqjLypCcU5clN9pWlD";
        try {
            String url = "https://www.google.com/recaptcha/api/siteverify?"
                    + "secret=" + secretKey
                    + "&response=" + response;
            String jsonText;
            try (InputStream res = new URL(url).openStream()) {
                BufferedReader rd = new BufferedReader(new InputStreamReader(res, Charset.forName("UTF-8")));
                StringBuilder sb = new StringBuilder();
                int cp;
                while ((cp = rd.read()) != -1) {
                    sb.append((char) cp);
                }
                jsonText = sb.toString();
            }
            JSONObject json = new JSONObject(jsonText);
            return json.getBoolean("success");
        } catch (IOException | JSONException e) {
            return false;
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "com.Legal_Advice.Controller";
    }// </editor-fold>

}
