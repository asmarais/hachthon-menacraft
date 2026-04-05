#!/usr/bin/env python3
"""
Quick test script to verify consistency score inversion
"""
import asyncio
import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from app.pipeline import Pipeline

async def test_consistency():
    pipeline = Pipeline()

    # Test with consistent content
    result = await pipeline.run(
        input_type="document",
        claim_text="The sky is blue",
        url=None,
        file=None
    )

    print("Test Results:")
    for axis in result['axes']:
        if axis['axis'] == 'Contextual Consistency':
            print(f"Consistency Score: {axis['score']:.2%}")
            print(f"Verdict: {axis['verdict']}")
            print(f"Explanation: {axis['explanation']}")

            # Check if score makes sense
            if axis['verdict'] == 'CONSISTENT' and axis['score'] > 0.5:
                print("✓ PASS: Consistent content shows high score")
            elif axis['verdict'] == 'HIGH_RISK' and axis['score'] < 0.5:
                print("✓ PASS: Inconsistent content shows low score")
            else:
                print("? UNCLEAR: Score doesn't match verdict clearly")

if __name__ == "__main__":
    asyncio.run(test_consistency())