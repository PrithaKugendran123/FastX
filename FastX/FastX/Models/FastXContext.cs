using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FastX.Models
{
    public partial class FastXContext : DbContext
    {
        public FastXContext()
        {
        }

        public FastXContext(DbContextOptions<FastXContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Administrator> Administrators { get; set; } = null!;
        public virtual DbSet<Booking> Bookings { get; set; } = null!;
        public virtual DbSet<BusOperator> BusOperators { get; set; } = null!;
        public virtual DbSet<BusRoute> BusRoutes { get; set; } = null!;
        public virtual DbSet<BusSchedule> BusSchedules { get; set; } = null!;
        public virtual DbSet<LoginTable> LoginTables { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Seat> Seats { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<bus> Buses { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=LAPTOP-O5GF91HV;database=FastX;trusted_connection=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Administrator>(entity =>
            {
                entity.HasKey(e => e.AdminId)
                    .HasName("PK__Administ__719FE4E8D67E36AB");

                entity.ToTable("Administrator");

                entity.HasIndex(e => e.Email, "UQ__Administ__A9D10534AF3E3E2D")
                    .IsUnique();

                entity.Property(e => e.AdminId).HasColumnName("AdminID");

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.Password).HasMaxLength(255);

                entity.Property(e => e.Role).HasMaxLength(30);
            });

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.ToTable("Booking");

                entity.Property(e => e.BookingId).HasColumnName("BookingID");

                entity.Property(e => e.BookingDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.BusId).HasColumnName("BusID");

                entity.Property(e => e.TotalCost).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Bus)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.BusId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Booking__BusID__5FB337D6");

                entity.HasOne(d => d.Schedule)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.ScheduleId)
                    .HasConstraintName("FK__Booking__Schedul__60A75C0F");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Booking__UserID__619B8048");
            });

            modelBuilder.Entity<BusOperator>(entity =>
            {
                entity.ToTable("BusOperator");

                entity.HasIndex(e => e.Email, "UQ__BusOpera__A9D1053413D4FF5D")
                    .IsUnique();

                entity.Property(e => e.BusOperatorId).HasColumnName("BusOperatorID");

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.ContactNumber).HasMaxLength(20);

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.Gender).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Password).HasMaxLength(255);

                entity.Property(e => e.Role).HasMaxLength(30);
            });

            modelBuilder.Entity<BusRoute>(entity =>
            {
                entity.HasKey(e => e.RouteId)
                    .HasName("PK__BusRoute__80979AADF210A21F");

                entity.Property(e => e.RouteId).HasColumnName("RouteID");

                entity.Property(e => e.Destination).HasMaxLength(100);

                entity.Property(e => e.Origin).HasMaxLength(100);

                entity.Property(e => e.TravelDate).HasColumnType("date");
            });

            modelBuilder.Entity<BusSchedule>(entity =>
            {
                entity.HasKey(e => e.ScheduleId)
                    .HasName("PK__BusSched__9C8A5B6943584F7D");

                entity.ToTable("BusSchedule");

                entity.Property(e => e.ScheduleId).HasColumnName("ScheduleID");

                entity.Property(e => e.BusId).HasColumnName("BusID");

                entity.Property(e => e.Fare).HasColumnType("decimal(10, 2)");

                entity.HasOne(d => d.Bus)
                    .WithMany(p => p.BusSchedules)
                    .HasForeignKey(d => d.BusId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__BusSchedu__BusID__59FA5E80");
            });

            modelBuilder.Entity<LoginTable>(entity =>
            {
                entity.HasKey(e => e.LoginId)
                    .HasName("PK__LoginTab__4DDA2818E8C7A1B1");

                entity.ToTable("LoginTable");

                entity.HasIndex(e => e.Email, "UQ__LoginTab__A9D1053455BE59E6")
                    .IsUnique();

                entity.Property(e => e.AdminId).HasColumnName("AdminID");

                entity.Property(e => e.BusOperatorId).HasColumnName("BusOperatorID");

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.Password).HasMaxLength(50);

                entity.Property(e => e.Role).HasMaxLength(30);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Admin)
                    .WithMany(p => p.LoginTables)
                    .HasForeignKey(d => d.AdminId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__LoginTabl__Admin__6C190EBB");

                entity.HasOne(d => d.BusOperator)
                    .WithMany(p => p.LoginTables)
                    .HasForeignKey(d => d.BusOperatorId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__LoginTabl__BusOp__6A30C649");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.LoginTables)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__LoginTabl__UserI__6B24EA82");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.ToTable("Payment");

                entity.Property(e => e.PaymentId).HasColumnName("PaymentID");

                entity.Property(e => e.BookingId).HasColumnName("BookingID");

                entity.Property(e => e.PaymentAmount).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.PaymentDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.PaymentMethod).HasMaxLength(50);

                entity.Property(e => e.TransactionStatus).HasMaxLength(100);

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.BookingId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Payment__Booking__656C112C");
            });

            modelBuilder.Entity<Seat>(entity =>
            {
                entity.Property(e => e.SeatId).HasColumnName("SeatID");

                entity.Property(e => e.BusId).HasColumnName("BusID");

                entity.HasOne(d => d.Bus)
                    .WithMany(p => p.Seats)
                    .HasForeignKey(d => d.BusId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Seats__BusID__5CD6CB2B");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.HasIndex(e => e.Email, "UQ__User__A9D1053425724081")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.ContactNumber).HasMaxLength(20);

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.Gender).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Password).HasMaxLength(255);

                entity.Property(e => e.Role).HasMaxLength(30);
            });

            modelBuilder.Entity<bus>(entity =>
            {
                entity.Property(e => e.BusId).HasColumnName("BusID");

                entity.Property(e => e.BusName).HasMaxLength(100);

                entity.Property(e => e.BusNumber).HasMaxLength(20);

                entity.Property(e => e.BusType).HasMaxLength(30);

                entity.Property(e => e.DropPoint).HasMaxLength(100);

                entity.Property(e => e.OperatorId).HasColumnName("OperatorID");

                entity.Property(e => e.PickUp).HasMaxLength(100);

                entity.Property(e => e.RouteId).HasColumnName("RouteID");

                entity.Property(e => e.SeatType).HasMaxLength(20);

                entity.Property(e => e.Tv).HasColumnName("TV");

                entity.HasOne(d => d.Operator)
                    .WithMany(p => p.buses)
                    .HasForeignKey(d => d.OperatorId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Buses__OperatorI__571DF1D5");

                entity.HasOne(d => d.Route)
                    .WithMany(p => p.buses)
                    .HasForeignKey(d => d.RouteId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Buses__RouteID__5629CD9C");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
