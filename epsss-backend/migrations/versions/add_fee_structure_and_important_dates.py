"""
Revision ID: add_fee_structure_and_important_dates
Revises: <previous_revision_id>
Create Date: 2025-08-31
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'add_fee_structure_and_important_dates'
down_revision = '1e6ad9312c91'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('admissions_content', sa.Column('fee_structure', sa.Text(), nullable=True))
    op.add_column('admissions_content', sa.Column('important_dates', sa.Text(), nullable=True))
    # Uncomment if requirements needs to be changed to Text:
    # op.alter_column('admissions_content', 'requirements', type_=sa.Text())

def downgrade():
    op.drop_column('admissions_content', 'fee_structure')
    op.drop_column('admissions_content', 'important_dates')
