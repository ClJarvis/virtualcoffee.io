import { type NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const queryparam = searchParams.get('path');
	let path = typeof queryparam === 'string' ? queryparam : '/';
	if (!path.startsWith('/')) {
		path = '/' + path;
	}

	// Invalidate the /posts route in the cache
	revalidatePath(path);

	redirect(path);
}
