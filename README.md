# 🚀 Frontend Training Homework Repository

Welcome to the Frontend Training program! This repository serves as a central hub for submitting and reviewing homework assignments throughout our training journey.

## 📚 About the Training Program

This training program is designed to help members of the Taekwondo UIT Club develop professional frontend engineering skills through a structured, hands-on approach. We're building these skills together to prepare for future club projects and initiatives. Here's what you can expect:

- 🌟 **Progressive Learning Path**: From fundamentals to advanced concepts
- 💻 **Practical Assignments**: Real-world projects to build your portfolio
- 🔍 **Code Reviews**: Personalized feedback from peers and mentors
- 🤝 **Collaborative Environment**: Learn alongside fellow club members
- 🛠️ **Industry Best Practices**: Modern tools, frameworks, and workflows

## 👨‍👩‍👧‍👦 About Our Team

We are members of the Taekwondo UIT Club who are passionate about not only martial arts but also technology. This frontend training initiative brings together club members with varying levels of programming experience to learn and grow together. Our vision is to enhance our technical skills to build impressive digital projects that will benefit our club and community in the future.

Our collaborative learning environment empowers everyone to contribute their unique perspectives while supporting each other's growth. Through this journey, we aim to create a strong technical foundation within our club.

We'll be exploring:

- 📚 Modern JavaScript, HTML5 & CSS3
- ⚛️ React and its ecosystem
- 🧪 Testing methodologies
- 🔄 State management
- 📱 Responsive design principles
- 🚀 Performance optimization

## 🗂️ Repository Structure

```
frontend-homework-submit/
│
├── beginner/
│   ├── week-1/
│   │   ├── [your-name]/
│   │   │   └── your homework files...
│   │   ├── [another-name]/
│   │   └── ...
│   │
│   ├── week-2/
│   │   └── ...
│   └── ...
│
├── medium/
│   └── ...
│
├── advanced/
│   └── ...
│
└── README.md
```

## ⏰ Important Deadlines

> ⚠️ **IMPORTANT**: All homework assignments must be submitted at least **ONE DAY BEFORE** the next club session. This gives time for code review and feedback. Late submissions may not receive feedback before the next session.

## 📝 Homework Submission Guidelines

### Initial Setup (One-time)

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/[training-org]/frontend-homework-submit.git
   cd frontend-homework-submit
   ```

### For Each Homework Assignment

1. Make sure you have the latest version of the main branch:

   ```bash
   git checkout main
   git pull origin main
   ```

2. Create a branch for your homework:

   ```bash
   git checkout -b [level]-week-[y]-[your-name]
   ```

   Example: `git checkout -b beginner-week-2-jane-doe`

3. Navigate to the correct directory and create your folder:

   ```bash
   cd [level]/week-[y]/
   mkdir [your-name]
   cd [your-name]
   ```

   Example: `cd beginner/week-1/ && mkdir jane-doe && cd jane-doe`

4. Add your homework files to this folder

5. Commit your changes:

   ```bash
   git add .
   git commit -m "Add [level] week-[y] homework"
   ```

6. Push your branch to the repository:

   ```bash
   git push origin [level]-week-[y]-[your-name]
   ```

7. Create a Pull Request (PR) from your branch to the main branch

### 📊 Example Submission Workflow

Let's say your name is Jane Doe, and you're submitting homework for Beginner level, Week 2:

```bash
# Make sure you're on the main branch and up-to-date
git checkout main
git pull origin main

# Create branch for this homework
git checkout -b beginner-week-2-jane-doe

# Navigate to correct directory
cd beginner/week-2/
mkdir jane-doe
cd jane-doe

# Create/copy your homework files into this directory
# ...

# Commit and push
git add .
git commit -m "Add beginner week-2 homework"
git push origin beginner-week-2-jane-doe
```

Then go to GitHub and create a Pull Request against the main branch.

## 🔄 Git Workflow Scenarios

### 🔍 Scenario 1: Updating Your Submission Before Review

If you need to make changes to your homework before it's been reviewed:

```bash
# Make sure you're on your homework branch
git checkout beginner-week-2-jane-doe

# Make your changes
# ...

# Commit and push updates
git add .
git commit -m "Update beginner week-2 homework"
git push origin beginner-week-2-jane-doe
```

Your Pull Request will automatically update.

### 💬 Scenario 2: Addressing Feedback After Review

If you've received feedback and need to make changes:

```bash
# Make sure you're on your homework branch
git checkout beginner-week-2-jane-doe

# Make the requested changes
# ...

# Commit and push updates
git add .
git commit -m "Address feedback for beginner week-2 homework"
git push origin beginner-week-2-jane-doe
```

### 📅 Scenario 3: Starting a New Week's Assignment

Always start from a fresh, updated main branch:

```bash
git checkout main
git pull origin main
git checkout -b beginner-week-3-jane-doe
# Continue with the submission process...
```

## ❓ Need Help?

If you encounter any issues with Git or have questions about the homework, feel free to:

- 🔔 Create an issue in this repository
- 💬 Reach out in our communication channels
- 🙋‍♂️ Ask during our regular sessions
- 📱 Contact the mentors directly via Slack

## 🎯 Expectations & Guidelines

- ⏱️ Submit your work **at least ONE DAY BEFORE** the next session
- 📏 Structure your code cleanly and include appropriate documentation
- 🧰 Follow best practices for the technologies we're learning
- 🤝 Engage constructively with feedback
- 🔄 Regularly commit your work (not just one large commit at the end)
- 📝 Include a README.md in your submissions explaining your approach
- 🧪 Test your code thoroughly before submission

## 🏆 Evaluation Criteria

Your homework will be evaluated based on:

- ✅ Functionality: Does the solution work as required?
- 🧠 Understanding: Do you demonstrate comprehension of the concepts?
- 🎨 Code quality: Is the code well-organized, readable, and maintainable?
- 📈 Progress: Are you improving based on previous feedback?

## 📜 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Happy coding! 💻✨
