# ⚡ GitHub Actions - Primeros Pasos

## 🎯 En 5 Minutos

### Paso 1: Configurar Secretos (2 min)

```bash
# Abre tu terminal y ejecuta:
gh secret set CYPRESS_USERNAME --body "tu_usuario_demoqa"
gh secret set CYPRESS_PASSWORD --body "tu_contraseña_demoqa"

# Verifica que se guardaron:
gh secret list
```

**¿No tienes `gh` instalado?**
Vé a: GitHub → Settings → Secrets and variables → Actions → New repository secret

### Paso 2: Hacer Commit y Push (2 min)

```bash
cd tu-proyecto
git add .
git commit -m "feat: setup GitHub Actions CI/CD pipelines"
git push origin tu-rama
```

### Paso 3: Ver los Workflows Ejecutarse (1 min)

1. Abre tu repositorio en GitHub
2. Ve a **Actions** tab
3. ¡Verás tus workflows ejecutándose! 🎉

---

## 🚀 Ejecutar Pruebas

### Opción 1: Automático (Recomendado)

```bash
# Solo hacer push/PR y los tests corren automáticamente
git push
```

### Opción 2: Manual desde GitHub UI

1. Actions → DemoQA E2E Tests
2. Run workflow → Configurar opciones
3. Run workflow

### Opción 3: Manual desde CLI

```bash
# Smoke tests (30 segundos)
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=smoke

# Todos los tests (3 minutos)
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=all

# Un archivo específico
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=spec \
  -f spec_file=cypress/e2e/ui/auth.login.cy.js
```

---

## 📊 Ver Resultados

```bash
# Listar runs recientes
gh run list --workflow=cypress.yml

# Ver logs de un run
gh run view <RUN_ID> --log

# Descargar artifacts
gh run download <RUN_ID> --dir ./results
```

---

## 📚 Documentación Completa

- **Guía completa**: [docs/github-actions-guide.md](github-actions-guide.md)
- **Referencia rápida**: [docs/github-actions-quick-ref.md](github-actions-quick-ref.md)
- **README**: [README.md](../README.md#cicd-integration)

---

## ✅ Checklist

- [ ] Secretos configurados (`gh secret list`)
- [ ] Cambios commiteados y pusheados
- [ ] Visto al menos un workflow completarse
- [ ] Descargado un artifact
- [ ] Leído la documentación completa

---

## 🆘 Problemas Comunes

### "No se ve el workflow"

→ Espera 1-2 minutos después del push
→ Recarga la página de GitHub
→ Verifica que estés en la rama correcta

### "Tests fallan sin razón"

→ Verifica secretos: `gh secret list`
→ Comprueba credenciales DemoQA en secretos
→ Revisa logs del workflow en GitHub

### "No tengo `gh` (GitHub CLI)"

→ Instala: https://cli.github.com/
→ O usa GitHub UI para todo

---

## 🎓 Próximos Pasos

1. **Explorar Workflows**: Ve a Actions y haz clic en un workflow completado
2. **Descargar Reports**: Ve a Artifacts y descarga `test-report-html`
3. **Configurar PR Requerimientos**: Settings → Branches → Add rule → Require status checks
4. **Leer la Guía Completa**: [github-actions-guide.md](github-actions-guide.md)

---

**¿Preguntas?** Revisa la [Guía Completa](github-actions-guide.md#troubleshooting)
