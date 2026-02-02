"use client";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Search,
  Filter,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  User,
} from "lucide-react";
import { ClaimItem } from "../AdminDashboard";

interface ClaimsQueueProps {
  claims: ClaimItem[];
  onSelectClaim: (claim: ClaimItem) => void;
  filter: "all" | "pending" | "flagged" | "approved" | "rejected";
  onFilterChange: (
    filter: "all" | "pending" | "flagged" | "approved" | "rejected",
  ) => void;
}

export function ClaimsQueue({
  claims,
  onSelectClaim,
  filter,
  onFilterChange,
}: ClaimsQueueProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "score" | "amount">("date");

  const getStatusIcon = (status: ClaimItem["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "flagged":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusLabel = (status: ClaimItem["status"]) => {
    switch (status) {
      case "pending":
        return "Processing";
      case "flagged":
        return "Flagged";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
    }
  };

  const getStatusVariant = (status: ClaimItem["status"]) => {
    switch (status) {
      case "approved":
        return "default";
      case "flagged":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPriorityColor = (priority: ClaimItem["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
    }
  };

  const getFraudScoreColor = (score: number) => {
    if (score < 30) return "text-green-600 bg-green-100";
    if (score < 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const filteredClaims = claims
    .filter(
      (claim) =>
        searchTerm === "" ||
        claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.policyHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return (
            new Date(b.submittedAt).getTime() -
            new Date(a.submittedAt).getTime()
          );
        case "score":
          return b.fraudScore - a.fraudScore;
        case "amount":
          return (
            parseInt(b.amount.replace(/[^\d]/g, "")) -
            parseInt(a.amount.replace(/[^\d]/g, ""))
          );
        default:
          return 0;
      }
    });

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Claims Queue</h2>
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search claims..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="date">Sort by Date</option>
            <option value="score">Sort by Risk Score</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(["all", "flagged", "approved", "pending", "rejected"] as const).map(
          (filterOption) => (
            <Button
              key={filterOption}
              variant={filter === filterOption ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(filterOption)}
              className="capitalize"
            >
              {filterOption === "all"
                ? "All Claims"
                : getStatusLabel(filterOption as any)}
              <Badge variant="secondary" className="ml-2 text-xs">
                {filterOption === "all"
                  ? claims.length
                  : claims.filter((c) => c.status === filterOption).length}
              </Badge>
            </Button>
          ),
        )}
      </div>

      {/* Claims Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Claim ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Policy Holder</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClaims.map((claim) => (
              <TableRow
                key={claim.id}
                className={`border-l-4 ${getPriorityColor(claim.priority)} hover:bg-gray-50 cursor-pointer`}
                onClick={() => onSelectClaim(claim)}
              >
                <TableCell className="font-mono text-sm">{claim.id}</TableCell>
                <TableCell>{claim.type}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{claim.policyHolder}</p>
                    <p className="text-sm text-gray-500">
                      {claim.policyNumber}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{claim.amount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getFraudScoreColor(claim.fraudScore)}`}
                    >
                      {claim.fraudScore}
                    </span>
                    <TrendingUp
                      className={`w-3 h-3 ${
                        claim.fraudScore < 30
                          ? "text-green-600"
                          : claim.fraudScore < 60
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getStatusVariant(claim.status)}
                    className="flex items-center gap-1 w-fit"
                  >
                    {getStatusIcon(claim.status)}
                    {getStatusLabel(claim.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-3 h-3" />
                    {new Date(claim.submittedAt).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(claim.submittedAt).toLocaleTimeString()}
                  </div>
                </TableCell>
                <TableCell>
                  {claim.assignedTo ? (
                    <div className="flex items-center gap-1 text-sm">
                      <User className="w-3 h-3 text-gray-400" />
                      {claim.assignedTo}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">Unassigned</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectClaim(claim);
                    }}
                    className="p-2"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <p>
          Showing {filteredClaims.length} of {claims.length} claims
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>High Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Medium Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Low Priority</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
