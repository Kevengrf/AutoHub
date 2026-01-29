import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { email, password } = await responseToJson(request)

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceRoleKey) {
            return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
            auth: {
                persistSession: false
            }
        })

        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return NextResponse.json({ message: 'User created successfully', user: data.user })
    } catch (err: any) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

async function responseToJson(request: Request) {
    return request.json()
}
