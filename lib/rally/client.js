'use client'

import { swell } from '@/lib/swell/init/client';
import { Rally } from '@rallycommerce/swell';

const configuration = {
  swellInstance: swell 
}

Rally.init(`${process.env.NEXT_PUBLIC_RALLY_CLIENT_ID}`, configuration);

export { Rally }