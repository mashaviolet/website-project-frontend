"""merge heads

Revision ID: bb7ddc2cebbe
Revises: 21e436b0f58d, add_fee_structure_and_important_dates
Create Date: 2025-08-31 19:05:13.318431

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bb7ddc2cebbe'
down_revision = ('21e436b0f58d', 'add_fee_structure_and_important_dates')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
