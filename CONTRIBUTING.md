# Contributing to ScholasticAI

Thank you for your interest in contributing to ScholasticAI! This document provides guidelines and instructions for contributing.

---

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/your-username/SAMS_15Dec25.git
   cd SAMS_15Dec25
   ```

3. **Create a branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Set up environment:**
   ```bash
   cp .env.example .env
   # Add your API key to .env
   ```

---

## 📝 Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Add comments for complex logic

### File Structure

- Components go in `components/`
- Context/State management in `context/`
- Services/API calls in `services/`
- Types in `types.ts`

### Testing

Before submitting a PR:

- [ ] Code builds without errors (`npm run build`)
- [ ] No linter errors (`npm run lint`)
- [ ] Tested in browser
- [ ] No console errors
- [ ] Responsive design works

---

## 🔍 Pull Request Process

1. **Update your branch:**
   ```bash
   git pull origin main
   ```

2. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

3. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create Pull Request:**
   - Go to GitHub
   - Click "New Pull Request"
   - Describe your changes clearly

### PR Checklist

- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated if needed
- [ ] No new warnings or errors
- [ ] Tested locally

---

## 🐛 Reporting Issues

When reporting bugs:

1. Check if issue already exists
2. Use the issue template
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Browser/OS information
   - Screenshots if applicable

---

## 💡 Feature Requests

For feature requests:

1. Check if feature already requested
2. Describe the feature clearly
3. Explain use case/benefit
4. Consider implementation complexity

---

## 📚 Documentation

- Update README.md if adding features
- Add comments to complex code
- Update DEPLOYMENT.md if deployment changes
- Keep code examples up to date

---

## ✅ Code Review

All PRs require review. Reviewers will check:

- Code quality and style
- Functionality
- Performance impact
- Security considerations
- Documentation

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to ScholasticAI! 🎉



