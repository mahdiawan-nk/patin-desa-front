// composables/useAuth.ts

interface User {
	id: number
	fullname: string
	email: string
	role: string
	no_hp: string
	nik: string
	jenis_kelamin: string
	tanggal_lahir: string
	alamat_lengkap: string
	tgl_bergabung: string
	status: string
}

export const useAuth = () => {
	const config = useRuntimeConfig()
	const baseURL = config.public.API_URL
	const user = useState<User | null>('auth_user', () => null)
	const token = useState<string | null>('auth_token', () => null)

	// Ambil token dari localStorage saat app dimulai
	if (process.client && !token.value) {
		const saved = localStorage.getItem('token')
		if (saved) token.value = saved
	}

	// Simpan ke localStorage setiap kali token berubah
	watch(token, (val) => {
		if (process.client) {
			if (val) {
				localStorage.setItem('token', val)
			} else {
				localStorage.removeItem('token')
			}
		}
	})

	// Fetch user dari API jika ada token
	const fetchUser = async () => {
		if (!token.value) return null
		try {
			const data = await $fetch<{ data: User }>('/auth/me', {
				baseURL,
				headers: { Authorization: `Bearer ${token.value}` }
			})
			user.value = data.data
			return user.value
		} catch (err) {
			console.error('Gagal fetch user:', err)
			logout()
			return null
		}
	}

	// Login: simpan token dan user
	const login = async (email: string, password: string) => {
		try {
			const data = await $fetch<{ access_token: string }>('/auth/login', {
				baseURL,
				method: 'POST',
				body: { email, password }
			})
			token.value = data.access_token
			await fetchUser()
			return true
		} catch (err) {
			console.error('Login gagal:', err)
			return false
		}
	}

	const updatePassword = async (old_password: string, new_password: string) => {
		try {
			const data = await $fetch('/auth/update-password', {
				baseURL,
				method: 'PUT',
				headers: { Authorization: `Bearer ${token.value}` },
				body: { old_password, new_password }
			})
			console.log(data)
			await fetchUser()
			return true
		} catch (err) {
			console.error('Login gagal:', err)
			return false
		}
	}
	// Logout: hapus token & user
	const logout = () => {
		token.value = null
		user.value = null

		if (process.client) {
			localStorage.removeItem('token')
		}
	}

	// Auto fetch user setelah reload jika token ada tapi user kosong
	if (process.client && token.value && !user.value) {
		fetchUser()
	}

	return {
		token,
		user,
		login,
		logout,
		fetchUser,
		updatePassword,
		isLoggedIn: computed(() => !!token.value)
	}
}
