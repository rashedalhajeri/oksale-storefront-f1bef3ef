import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// تحديث الألوان لتتناسب مع الثيم الجديد
				oksale: {
					50: "#F0F7FF",
					100: "#DBE9FF",
					200: "#B8D4FF",
					300: "#8BBDFF",
					400: "#5296FF",
					500: "#3366FF",
					600: "#2952CC",
					700: "#1F3F99",
					800: "#152C66",
					900: "#0A1433"
				},
				// ألوان الـ bluesky بناء على الصورة المرفقة
				bluesky: {
					50: "#F5F9FF",
					100: "#E0EFFF",
					200: "#C7DFFF",
					300: "#94C6FF",
					400: "#5BA4FF",
					500: "#3366FF",
					600: "#2541FF", 
					700: "#1B31CC",
					800: "#132099",
					900: "#0A1433"
				},
				// ألوان أرجوانية تناسب الثيم الجديد
				purple: {
					50: "#F9F5FF",
					100: "#EFEBFF",
					200: "#E4D9FF",
					300: "#C9B8FE",
					400: "#A78BFA",
					500: "#8B5CF6",
					600: "#7C3AED",
					700: "#6D28D9",
					800: "#5B21B6",
					900: "#4C1D95"
				},
				// ألوان محايدة
				neutral: {
					50: "#FAFAFA",
					100: "#F4F4F5",
					200: "#E4E4E7",
					300: "#D4D4D8",
					400: "#A1A1AA",
					500: "#71717A",
					600: "#52525B",
					700: "#3F3F46",
					800: "#27272A",
					900: "#18181B"
				},
				blur: "rgba(255, 255, 255, 0.8)"
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'floating': {
					'0%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
					'100%': { transform: 'translateY(0px)' }
				},
				'pulse-light': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'slide-up': 'slide-up 0.6s ease-out',
				'slide-down': 'slide-down 0.6s ease-out',
				'floating': 'floating 3s ease-in-out infinite',
				'pulse-light': 'pulse-light 3s ease-in-out infinite',
				'spin-slow': 'spin-slow 10s linear infinite'
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(20px)',
			},
			backgroundColor: {
				'glass': 'rgba(255, 255, 255, 0.1)',
			},
			fontFamily: {
				sans: ['Tajawal', 'SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
				serif: ['SF Pro Text', 'Georgia', 'serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
