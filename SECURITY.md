# Security Policy — MADU Web

## Scope
Este repositorio contiene el sitio web estático de **MADU Escuela de Parkour y Movimiento** (landing page HTML/CSS/JS sin backend).

## Reporte de Vulnerabilidades
Si detectas un problema de seguridad, por favor repórtalo de forma responsable antes de divulgarlo públicamente:

- **Contacto:** info@madu-movement.com  
- **Asunto:** `[SECURITY] Descripción breve del hallazgo`
- **Respuesta esperada:** 72 horas hábiles

Incluye en tu reporte:
1. Descripción del hallazgo y su impacto potencial
2. Pasos para reproducirlo
3. Versión del navegador / entorno

## Mitigaciones Implementadas (2026-05-15)
| Control | ASVS ID | Estado |
|---------|---------|--------|
| Content Security Policy | V14.4.3 | ✅ Activo |
| X-Frame-Options | V14.4.4 | ✅ Activo |
| X-Content-Type-Options | V14.4.2 | ✅ Activo |
| Referrer-Policy | V14.4.5 | ✅ Activo |
| Permissions-Policy | V14.4.6 | ✅ Activo |
| SRI para scripts externos | V14.2.3 | ✅ Activo (Lucide v0.468.0) |
| iframe sandbox | V13.4.1 | ✅ Activo (Google Maps) |

## Controles Pendientes (configuración de servidor)
Los siguientes controles requieren configuración a nivel de servidor/CDN (nginx, Apache, Cloudflare):
- `Strict-Transport-Security: max-age=31536000; includeSubDomains` (HSTS)
- Redireccionamiento HTTP → HTTPS

## Versiones Soportadas
| Tecnología | Versión | Soporte |
|-----------|---------|---------|
| Lucide Icons | 0.468.0 | ✅ Activa |
| Bebas Neue / Barlow | Google Fonts | ✅ Activa |

## Alcance Fuera de Scope
- Cuentas de redes sociales (@madu_movement)
- Número de teléfono/WhatsApp de contacto
- Infraestructura de hosting (no controlada por este repositorio)
