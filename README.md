# 🦇 Batman Flexbox Challenge Game

An interactive web game that teaches CSS Flexbox concepts through Batman-themed challenges. Help Batman save Gotham City while mastering the art of CSS Flexbox layout!

![Batman Flexbox Game](https://img.shields.io/badge/Game-Batman%20Flexbox-blue?style=for-the-badge&logo=css3&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🎯 Overview

This educational game transforms learning CSS Flexbox from a mundane task into an exciting superhero adventure. Students help Batman navigate through 18 progressively challenging levels, each designed to teach specific Flexbox properties and concepts.

## ✨ Features

### 🎮 Game Features
- **18 Progressive Levels**: From basic centering to complex wrapped layouts
- **Batman Theme**: Engaging storyline with Gotham City scenarios
- **Real-time Visual Feedback**: See your CSS changes instantly
- **Level Completion System**: "Play Again" or "Next Level" options
- **Score Tracking**: Points-based progression system
- **Hints System**: Built-in help for stuck players

### 💻 Technical Features
- **Modern Next.js 13+**: App Router with TypeScript
- **Responsive Design**: Works on all device sizes
- **Professional UI**: Clean, minimal design with Tailwind CSS
- **Syntax Highlighting**: Color-coded CSS input with validation
- **Property Suggestions**: Smart hints for expected properties
- **Solution Viewer**: Step-by-step solution reveals

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ahmadhassan30/Flexbox-Game-For-Students.git
   cd Flexbox-Game-For-Students
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎓 Educational Content

### Flexbox Concepts Covered

| Level Range | Concepts | Properties |
|-------------|----------|------------|
| 1-3 | Basic Alignment | `justify-content`, `align-items` |
| 4-5 | Flex Direction | `flex-direction`, `justify-content` |
| 6-8 | Distribution | `space-between`, `space-around`, `space-evenly` |
| 9-10 | Reverse Layouts | `row-reverse`, `column-reverse` |
| 11-12 | Wrapping | `flex-wrap`, `align-content` |
| 13-15 | Individual Control | `flex-grow`, `align-self`, `order` |
| 16-18 | Advanced | `gap`, `stretch`, complex combinations |

### Learning Progression

1. **Beginner**: Basic positioning and alignment
2. **Intermediate**: Direction changes and distribution
3. **Advanced**: Wrapping, individual item control, and complex layouts

## 🛠️ Tech Stack

- **Framework**: [Next.js 13+](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom components with shadcn/ui patterns
- **Font**: [Sour Gummy](https://fonts.google.com/specimen/Sour+Gummy) from Google Fonts
- **Icons**: [Lucide React](https://lucide.dev/)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and font configurations
│   ├── layout.tsx         # Root layout with font setup
│   └── page.tsx           # Main game page
├── components/
│   ├── characters/        # Hero and enemy character components
│   ├── game/              # Core game components
│   │   ├── Battlefield.tsx    # Visual game area
│   │   ├── CodeInput.tsx      # CSS code input with validation
│   │   ├── Feedback.tsx       # Success/failure feedback
│   │   └── ReferenceCard.tsx  # Flexbox reference guide
│   ├── layout/            # Layout components
│   │   ├── Header.tsx         # Professional header
│   │   └── GameComplete.tsx   # Game completion screen
│   └── ui/                # Reusable UI components
├── data/
│   └── levels.ts          # Game level definitions
├── hooks/
│   └── useFlexboxGame.ts  # Game state management
├── lib/
│   ├── gameUtils.ts       # Game logic utilities
│   └── utils.ts           # General utilities
└── types/
    └── index.ts           # TypeScript type definitions
```

## 🎨 Game Levels Preview

### Level 1: The Gotham Guardian
> "Batman stands guard over Gotham City. Position Batman in the center of the battlefield."
- **Objective**: Center Batman both horizontally and vertically
- **Properties**: `justify-content: center`, `align-items: center`

### Level 6: Three Heroes United
> "Batman and allies spread out evenly across the rooftop."
- **Objective**: Distribute heroes with equal space between them
- **Properties**: `justify-content: space-between`

### Level 18: Ultimate Battle
> "Batman masters the ultimate formation: wrapped, centered, and spaced to perfection."
- **Objective**: Complex layout with wrapping and distribution
- **Properties**: `flex-wrap: wrap`, `justify-content: center`, `align-content: space-around`

## 🎯 Learning Outcomes

After completing this game, students will be able to:

- ✅ Understand the Flexbox layout model
- ✅ Use `justify-content` for main axis alignment
- ✅ Apply `align-items` for cross axis alignment
- ✅ Control layout direction with `flex-direction`
- ✅ Manage wrapping with `flex-wrap` and `align-content`
- ✅ Create responsive layouts with Flexbox
- ✅ Debug and troubleshoot Flexbox layouts

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain the Batman theme consistency
- Add appropriate comments for complex logic
- Test on multiple screen sizes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Ahmad Hassan**
- LinkedIn: [ahmad-hassan3110](https://www.linkedin.com/in/ahmad-hassan3110/)
- Created for Web Ascend Bootcamp 2025

## 🙏 Acknowledgments

- **Web Ascend Bootcamp** for the learning opportunity
- **Batman Universe** for the inspiring theme
- **CSS Flexbox** specification for the educational foundation
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first approach

---

<div align="center">

**© 2025 Aestroid. All Rights Reserved.**

Made with ❤️ for students learning web development

[⭐ Star this repository](https://github.com/Ahmadhassan30/Flexbox-Game-For-Students) if it helped you learn Flexbox!

</div>
