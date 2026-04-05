#!/usr/bin/env python3
import asyncio
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from app.pipeline import Pipeline

async def test():
    p = Pipeline()
    result = await p.run('document', claim_text='The sky is blue', url=None, file=None)
    for axis in result['axes']:
        if axis['axis'] == 'Contextual Consistency':
            print(f'Consistency - Score: {axis["score"]}, Verdict: {axis["verdict"]}')

if __name__ == "__main__":
    asyncio.run(test())